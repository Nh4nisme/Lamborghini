import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { CarConfiguration, CameraPreset, RimOption, TireOption } from '../types';
import { LamborghiniRevueltoModel } from './CarModel';
import { getGlbModelProfile } from './glbModelProfiles';
import {
  applyInteriorPalette,
  createInteriorMaterialSet,
  disposeInteriorMaterialSet,
  interiorMaterialFor,
  type InteriorMaterialSet,
  type InteriorPalette,
} from './interiorMaterials';
import {
  TYRE_BORE_RATIO,
  TYRE_NODE_NAME,
  TYRE_PACK_URL,
  buildWheelTemplate,
  createWheelInstance,
  detectWheels,
  disposeObject,
  fitTyreToBore,
  rimSurfaceFor,
  stripTyreLettering,
  tintWheelTemplate,
  type DetectedWheel,
  type WheelTemplate,
} from './wheelSwap';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface StudioSceneProps {
  config: CarConfiguration;
  activeCameraPreset: CameraPreset;
  theme?: 'light' | 'dark';
  onControlsInteracted?: () => void;
  onModelLoaded?: (modelName: string, objectUrl: string) => void;
}

const interiorPaletteFor = (trim: CarConfiguration['interiorTrim']): InteriorPalette => ({
  primary: trim.primaryLeatherHex,
  secondary: trim.secondaryLeatherHex,
  stitching: trim.stitchingHex,
});

const CAMERA_POSITIONS: Record<CameraPreset, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  three_quarter_front: {
    pos: new THREE.Vector3(3.6, 1.35, 3.8),
    target: new THREE.Vector3(0, 0.42, 0.2),
  },
  side_profile: {
    pos: new THREE.Vector3(-4.9, 0.95, 0),
    target: new THREE.Vector3(0, 0.42, 0),
  },
  rear_three_quarter: {
    pos: new THREE.Vector3(0, 0.85, -4.6),
    target: new THREE.Vector3(0, 0.42, -0.4),
  },
  top_down: {
    pos: new THREE.Vector3(0.01, 5.8, 0.01),
    target: new THREE.Vector3(0, 0.42, 0),
  },
  front_fascia: {
    pos: new THREE.Vector3(0, 0.78, 4.4),
    target: new THREE.Vector3(0, 0.42, 0.5),
  },
  wheel_closeup: {
    pos: new THREE.Vector3(-2.2, 0.65, 1.8),
    target: new THREE.Vector3(-0.95, 0.38, 1.45),
  },
  cockpit: {
    pos: new THREE.Vector3(-0.35, 0.96, 0.02),
    target: new THREE.Vector3(0, 0.62, 1.2),
  },
};

export const StudioScene: React.FC<StudioSceneProps> = ({
  config,
  activeCameraPreset,
  theme = 'light',
  onControlsInteracted,
  onModelLoaded,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const carModelRef = useRef<LamborghiniRevueltoModel | null>(null);
  const customModelGroupRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(CAMERA_POSITIONS.three_quarter_front.pos.clone());
  const targetCamTarget = useRef<THREE.Vector3>(CAMERA_POSITIONS.three_quarter_front.target.clone());
  const isTransitioningCam = useRef(false);

  // Keep a fresh ref to config for asynchronous callbacks
  const configRef = useRef(config);
  configRef.current = config;

  // Material maps for SC18 Alston & generic GLB models
  const bodyMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const caliperMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const wheelMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const interiorSetRef = useRef<InteriorMaterialSet | null>(null);
  const carbonMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lightMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const wheelPackRef = useRef<THREE.Group | null>(null);
  const wheelPackPromiseRef = useRef<Promise<void> | null>(null);
  const wheelTemplatesRef = useRef(new Map<string, WheelTemplate | null>());
  const tyrePackRef = useRef<THREE.Group | null>(null);
  const tyrePackPromiseRef = useRef<Promise<void> | null>(null);
  const tyreTemplatesRef = useRef(new Map<string, WheelTemplate | null>());
  const originalRimMeshesRef = useRef<THREE.Mesh[]>([]);
  const originalWheelsRef = useRef<DetectedWheel[]>([]);
  const rimIncludesTyreRef = useRef(false);
  const customWheelGroupRef = useRef<THREE.Group | null>(null);
  const appliedWheelKeyRef = useRef('');
  const loadSeqRef = useRef(0);

  const requestRenderRef = useRef<() => void>(() => {});
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [loadProgress, setLoadProgress] = useState<string | null>(null);

  /**
   * Picks the wheel-pack rim for a rim option. API options carry a numeric id
   * ("6", "7", "8"), so the name decides; static options also match by id.
   * Node names are the raw GLB names and get sanitized on lookup.
   */
  const resolveWheelNodeName = (rim: RimOption): string => {
    const normalize = (value: string) => value.toLowerCase().replace(/[_\s/]+/g, '-');
    const key = `${normalize(rim.name || '')} ${normalize(rim.id || '')}`;

    if (key.includes('mul-spoke')) return '<Wheel.006_2';
    if (key.includes('multi')) return 'wheels3_1';
    if (key.includes('three')) return '<Wheel.002_3';
    if (key.includes('bronze')) return 'wheels3_1';
    if (key.includes('forged') || key.includes('altanero')) return '<Wheel.001_4';
    if (key.includes('veneno') || key.includes('diamond')) return 'Plane.031_0';
    // Unmapped options still get a pack rim so the change is visible.
    return 'wheels3_1';
  };

  /**
   * Picks the tyre-pack variant for a tyre option (group 6). The pack holds four
   * tyres (three Pirelli P Zero styles and a Yokohama ADVAN); the two non-Pirelli
   * options share the ADVAN mesh, one of them with a plain sidewall, so all five
   * options look different. Checked most specific first.
   */
  const resolveTyreVariant = (tire: TireOption): { nodeName: string; plainSidewall: boolean } => {
    const key = `${tire.name} ${tire.id}`.toLowerCase();
    if (key.includes('trofeo')) return { nodeName: 'Cylinder_1', plainSidewall: false };
    if (key.includes('corsa')) return { nodeName: '<Wheel_0', plainSidewall: false };
    if (key.includes('p zero') || key.includes('pzero')) return { nodeName: 'Circle.004_3', plainSidewall: false };
    if (key.includes('michelin') || key.includes('cup')) return { nodeName: 'pneu ar-gauche 3_2', plainSidewall: false };
    if (key.includes('bridgestone') || key.includes('potenza')) return { nodeName: 'pneu ar-gauche 3_2', plainSidewall: true };
    return { nodeName: 'Circle.004_3', plainSidewall: false };
  };

  const getWheelTemplate = (nodeName: string): WheelTemplate | null => {
    const cache = wheelTemplatesRef.current;
    if (!cache.has(nodeName)) {
      cache.set(nodeName, wheelPackRef.current ? buildWheelTemplate(wheelPackRef.current, nodeName) : null);
    }
    return cache.get(nodeName) ?? null;
  };

  /** Template for the selected tyre, reshaped to the shared bore so the rim keeps its size. */
  const getTyreTemplate = (tire: TireOption): WheelTemplate | null => {
    const pack = tyrePackRef.current;
    if (!pack) return null;
    const { nodeName, plainSidewall } = resolveTyreVariant(tire);
    const key = `${nodeName}|${plainSidewall}`;
    const cache = tyreTemplatesRef.current;
    if (!cache.has(key)) {
      const raw = buildWheelTemplate(pack, nodeName);
      const fitted = raw ? fitTyreToBore(raw, TYRE_BORE_RATIO) : null;
      if (fitted && plainSidewall) stripTyreLettering(fitted);
      cache.set(key, fitted);
    }
    return cache.get(key) ?? null;
  };

  /** Loads a GLB scene once; concurrent callers share the same request. */
  const loadPackOnce = (
    url: string,
    sceneRefToFill: React.MutableRefObject<THREE.Group | null>,
    promiseRef: React.MutableRefObject<Promise<void> | null>
  ): Promise<void> => {
    if (sceneRefToFill.current) return Promise.resolve();
    if (promiseRef.current) return promiseRef.current;

    promiseRef.current = new Promise<void>((resolve, reject) => {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        url,
        (gltf) => {
          dracoLoader.dispose();
          sceneRefToFill.current = gltf.scene;
          resolve();
        },
        undefined,
        (error) => {
          dracoLoader.dispose();
          promiseRef.current = null;
          console.error(`Failed to load ${url}:`, error);
          reject(error);
        }
      );
    });
    return promiseRef.current;
  };

  const loadWheelPack = () =>
    loadPackOnce('/models/free__wheel_pack_lamborghini_sdc-v9.glb', wheelPackRef, wheelPackPromiseRef);

  const loadTyrePack = () => loadPackOnce(TYRE_PACK_URL, tyrePackRef, tyrePackPromiseRef);

  const setOriginalRimsVisible = (visible: boolean) => {
    originalRimMeshesRef.current.forEach((mesh) => (mesh.visible = visible));
  };

  /** Removes fitted pack wheels. Their geometry and materials belong to the cached templates. */
  const clearCustomWheels = () => {
    if (customWheelGroupRef.current) {
      customWheelGroupRef.current.removeFromParent();
      customWheelGroupRef.current = null;
    }
    appliedWheelKeyRef.current = '';
  };

  const wheelKeyFor = (rim: RimOption, tire?: TireOption | null) =>
    `${rim.id}|${rim.name}|${rim.hex}|${rim.finish}|${tire?.id ?? ''}|${tyrePackRef.current ? 1 : 0}`;

  /**
   * Picks the tyre to fit on a car whose rim meshes include the tyre. A selected
   * tyre needs the tyre pack; until it has loaded the default pack tyre is used
   * and the swap re-runs once it arrives.
   */
  const resolveFittedTyre = (tire: TireOption | null | undefined): WheelTemplate | null => {
    if (!rimIncludesTyreRef.current) return null;
    if (tire) {
      if (tyrePackRef.current) {
        const selected = getTyreTemplate(tire);
        if (selected) return selected;
      } else {
        const loadSeq = loadSeqRef.current;
        loadTyrePack()
          .then(() => {
            if (loadSeq !== loadSeqRef.current) return;
            applyWheelSwap(configRef.current.rim, configRef.current.tire);
            requestRenderRef.current();
          })
          .catch(() => console.warn('Tyre pack not available, using the default tyre'));
      }
    }
    return getWheelTemplate(TYRE_NODE_NAME);
  };

  /**
   * Fits the selected wheel-pack rim onto every detected wheel. The wheels are
   * added to the scene in world space: the detected centres and sizes are
   * already world values, so parenting them to the scaled, offset car model
   * would apply that transform twice.
   */
  const applyWheelSwap = (rim: RimOption, tire?: TireOption | null) => {
    const scene = sceneRef.current;
    if (!scene || !customModelGroupRef.current || !wheelPackRef.current) return;

    clearCustomWheels();
    const wheels = originalWheelsRef.current;
    const rimTemplate = getWheelTemplate(resolveWheelNodeName(rim));
    const tyreTemplate = resolveFittedTyre(tire);

    if (!rimTemplate || wheels.length === 0 || (rimIncludesTyreRef.current && !tyreTemplate)) {
      setOriginalRimsVisible(true);
      return;
    }

    tintWheelTemplate(rimTemplate, rim.hex, rim.finish);

    const group = new THREE.Group();
    group.name = 'ConfiguratorWheels';
    wheels.forEach((wheel) => {
      if (tyreTemplate) {
        group.add(createWheelInstance(tyreTemplate, wheel, wheel.diameter));
        // Fill the shared tyre bore, with a little overlap so no gap shows. Every
        // fitted tyre has this bore, so the rim size never depends on the tyre.
        group.add(createWheelInstance(rimTemplate, wheel, wheel.diameter * TYRE_BORE_RATIO * 1.02));
      } else {
        group.add(createWheelInstance(rimTemplate, wheel, wheel.diameter));
      }
    });

    setOriginalRimsVisible(false);
    scene.add(group);
    customWheelGroupRef.current = group;
    appliedWheelKeyRef.current = wheelKeyFor(rim, tire);
  };

  /** Removes the current GLB car, its fitted wheels, and frees its GPU resources. */
  const removeCustomModel = () => {
    clearCustomWheels();
    originalRimMeshesRef.current = [];
    originalWheelsRef.current = [];
    if (customModelGroupRef.current) {
      customModelGroupRef.current.removeFromParent();
      disposeObject(customModelGroupRef.current);
      customModelGroupRef.current = null;
    }
    if (interiorSetRef.current) {
      disposeInteriorMaterialSet(interiorSetRef.current);
      interiorSetRef.current = null;
    }
  };

  /** Shared physical paint so every car's body responds the same way to the colour picker. */
  const createBodyPaint = (paint: CarConfiguration['exteriorColor']) =>
    new THREE.MeshPhysicalMaterial({
      name: 'ConfiguratorBodyPaint',
      color: new THREE.Color(paint.hex),
      metalness: paint.metalness,
      roughness: paint.roughness,
      clearcoat: paint.clearcoat,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.2,
    });

  /**
   * Shared caliper finish. Like the body paint it replaces the source slots, because
   * some caliper materials are textured (SC18 palette atlas) and a tint would stay dark.
   */
  const createCaliperPaint = (hex: string) =>
    new THREE.MeshStandardMaterial({
      name: 'ConfiguratorCaliperPaint',
      color: new THREE.Color(hex),
      metalness: 0.35,
      roughness: 0.32,
      envMapIntensity: 1.1,
    });

  // Reusable loader for GLB files with Draco decompression support
  const loadCustomModel = (url: string) => {
    if (!sceneRef.current) return;

    const loadSeq = ++loadSeqRef.current;
    setLoadProgress('Loading 3D model...');
    const loader = new GLTFLoader();

    // Use locally hosted Draco WASM decoder for fast, offline-safe loading
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      url,
      (gltf) => {
        dracoLoader.dispose();
        const model = gltf.scene;

        // A newer car was requested while this one was downloading.
        if (!sceneRef.current || loadSeq !== loadSeqRef.current) {
          disposeObject(model);
          return;
        }

        // Hide procedural model when custom GLB is loaded
        if (carModelRef.current) {
          carModelRef.current.root.visible = false;
        }

        removeCustomModel();

        const profile = getGlbModelProfile(url);

        // Reset material buckets
        bodyMaterialsRef.current = [];
        caliperMaterialsRef.current = [];
        wheelMaterialsRef.current = [];
        carbonMaterialsRef.current = [];
        lightMaterialsRef.current = [];

        // Nose toward +Z so the camera presets and wheel detection see every car the same way.
        model.rotation.y = profile.rotationY;

        // Compute bounding box to normalize scale and center model
        const initialBox = new THREE.Box3().setFromObject(model);
        const size = initialBox.getSize(new THREE.Vector3());

        // Target length approx 4.7m
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.7 / (maxDim || 1);
        model.scale.setScalar(scale);

        // Recompute box after scaling to position flush on floor
        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = scaledBox.getCenter(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.z = -center.z;
        model.position.y = -scaledBox.min.y + 0.005;

        const currentCfg = configRef.current;
        const wheelColor = new THREE.Color(currentCfg.rim.hex);
        const bodyPaint = createBodyPaint(currentCfg.exteriorColor);
        const caliperPaint = createCaliperPaint(currentCfg.caliper.hex);
        const interiorSet = createInteriorMaterialSet(interiorPaletteFor(currentCfg.interiorTrim));
        interiorSetRef.current = interiorSet;
        const rimMeshes: THREE.Mesh[] = [];

        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh) || !child.material) return;
          child.castShadow = true;
          child.receiveShadow = true;

          const isArray = Array.isArray(child.material);
          const materials: THREE.Material[] = isArray ? [...child.material] : [child.material];
          let replacedPaint = false;
          let isRim = false;

          materials.forEach((m, index) => {
            if (profile.isRim(child, m)) isRim = true;

            // Body paint replaces the slot outright: the source materials are often
            // shared with trim or wheels, textured, or nearly black, and tinting them
            // in place would either leak onto other parts or stay dark.
            if (profile.isBody(child, m)) {
              materials[index] = bodyPaint;
              replacedPaint = true;
              return;
            }
            if (profile.isCaliper(child, m)) {
              materials[index] = caliperPaint;
              replacedPaint = true;
              return;
            }
            // Cabin slots follow the interior trim; screens, glass and logos have no role.
            const interiorRole = profile.interiorRole(child, m);
            if (interiorRole) {
              materials[index] = interiorMaterialFor(interiorSet, interiorRole, m, profile.atlasKeepRects);
              replacedPaint = true;
              return;
            }

            const name = (m.name || '').toLowerCase();
            if (!(m instanceof THREE.MeshStandardMaterial)) return;

            // Only rim slots: tyres and brake discs can carry "wheel" in their names too.
            if (profile.isRim(child, m) && (name.includes('wheel') || name.includes('rim'))) {
              wheelMaterialsRef.current.push(m);
              m.color.copy(wheelColor);
            } else if (name.includes('carbon')) {
              carbonMaterialsRef.current.push(m);
            } else if (name.includes('light')) {
              lightMaterialsRef.current.push(m);
            }
          });

          if (replacedPaint) child.material = isArray ? materials : materials[0];
          if (isRim) rimMeshes.push(child);
        });

        bodyMaterialsRef.current = [bodyPaint];
        caliperMaterialsRef.current = [caliperPaint];

        sceneRef.current.add(model);
        customModelGroupRef.current = model;

        model.updateMatrixWorld(true);
        originalRimMeshesRef.current = rimMeshes;
        originalWheelsRef.current = detectWheels(rimMeshes);
        rimIncludesTyreRef.current = profile.rimIncludesTyre;
        requestRenderRef.current();

        loadWheelPack()
          .then(() => {
            if (loadSeq !== loadSeqRef.current) return;
            applyWheelSwap(configRef.current.rim, configRef.current.tire);
            requestRenderRef.current();
          })
          .catch(() => {
            console.warn('Wheel pack not available, using original wheels');
            requestRenderRef.current();
          });

        setLoadProgress(null);
      },
      (xhr) => {
        if (xhr.total > 0 && loadSeq === loadSeqRef.current) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(`Loading 3D model ${pct}%`);
        }
      },
      (error) => {
        dracoLoader.dispose();
        if (loadSeq !== loadSeqRef.current) return;
        console.error('Error loading GLB:', error);
        setLoadProgress(null);
        // Show procedural model if GLB fails
        if (carModelRef.current) {
          carModelRef.current.root.visible = true;
        }
        requestRenderRef.current();
      }
    );
  };

  useEffect(() => {
    const preset = CAMERA_POSITIONS[activeCameraPreset];
    if (preset) {
      targetCamPos.current.copy(preset.pos);
      targetCamTarget.current.copy(preset.target);
      isTransitioningCam.current = true;
      requestRenderRef.current();
    }
  }, [activeCameraPreset]);

  // Handle configuration updates on procedural or custom model
  useEffect(() => {
    if (carModelRef.current) {
      carModelRef.current.updateConfiguration(config);
    }

    // Apply color and finishes to custom loaded GLB model materials
    const paintColor = new THREE.Color(config.exteriorColor.hex);
    bodyMaterialsRef.current.forEach((mat) => {
      mat.color.copy(paintColor);
      mat.roughness = config.exteriorColor.roughness;
      mat.metalness = config.exteriorColor.metalness;
      if (mat instanceof THREE.MeshPhysicalMaterial) {
        mat.clearcoat = config.exteriorColor.clearcoat;
      }
      mat.needsUpdate = true;
    });

    const caliperColor = new THREE.Color(config.caliper.hex);
    caliperMaterialsRef.current.forEach((mat) => {
      mat.color.copy(caliperColor);
      mat.needsUpdate = true;
    });

    const wheelColor = new THREE.Color(config.rim.hex);
    wheelMaterialsRef.current.forEach((mat) => {
      mat.color.copy(wheelColor);
      const surface = rimSurfaceFor(`${config.rim.id} ${config.rim.finish}`);
      mat.metalness = surface.metalness;
      mat.roughness = surface.roughness;
      mat.needsUpdate = true;
    });

    // Only rebuild the fitted wheels when the rim itself changed, not on every paint tweak.
    if (
      customModelGroupRef.current &&
      wheelPackRef.current &&
      wheelKeyFor(config.rim, config.tire) !== appliedWheelKeyRef.current
    ) {
      applyWheelSwap(config.rim, config.tire);
    }

    // Uniform/colour updates only: the atlas shader reads the shared tint uniform.
    if (interiorSetRef.current) {
      applyInteriorPalette(interiorSetRef.current, interiorPaletteFor(config.interiorTrim));
    }

    const isShinyCarbon = config.carbonLower === 'shiny_carbon';
    carbonMaterialsRef.current.forEach((mat) => {
      mat.color.set(isShinyCarbon ? '#121215' : '#1c1d22');
      mat.roughness = isShinyCarbon ? 0.22 : 0.45;
      mat.metalness = isShinyCarbon ? 0.65 : 0.4;
      mat.needsUpdate = true;
    });

    const lightEmissive = config.lightsOn ? 1.5 : 0.1;
    lightMaterialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = lightEmissive;
      mat.emissive.set(config.lightsOn ? '#bae6fd' : '#1e293b');
      mat.needsUpdate = true;
    });

    requestRenderRef.current();
  }, [config]);

  // Dynamic theme update for 3D Studio Environment
  useEffect(() => {
    if (!sceneRef.current) return;
    const isLight = theme === 'light';
    const bgColor = isLight ? '#f2f3f5' : '#0a0b0e';
    const floorColor = isLight ? '#e6e8eb' : '#14161d';

    sceneRef.current.background = new THREE.Color(bgColor);
    if (sceneRef.current.fog) {
      sceneRef.current.fog.color.set(bgColor);
    }
    if (floorMatRef.current) {
      floorMatRef.current.color.set(floorColor);
      floorMatRef.current.roughness = isLight ? 0.38 : 0.28;
      floorMatRef.current.metalness = isLight ? 0.15 : 0.55;
      floorMatRef.current.needsUpdate = true;
    }
    requestRenderRef.current();
  }, [theme]);

  // Trigger loading when customModelUrl changes after mount
  useEffect(() => {
    if (config.customModelUrl && sceneRef.current) {
      loadCustomModel(config.customModelUrl);
    } else if (!config.customModelUrl && carModelRef.current) {
      loadSeqRef.current++;
      removeCustomModel();
      bodyMaterialsRef.current = [];
      carModelRef.current.root.visible = true;
      requestRenderRef.current();
    }
  }, [config.customModelUrl]);

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 0 && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
        const objectUrl = URL.createObjectURL(file);
        onModelLoaded?.(file.name.replace(/\.[^/.]+$/, ''), objectUrl);
      }
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const loadSeq = loadSeqRef;
    const wheelTemplates = wheelTemplatesRef.current;
    const tyreTemplates = tyreTemplatesRef.current;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene Setup with Studio Lighting
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const isLightInitial = theme === 'light';
    const initBg = isLightInitial ? '#f2f3f5' : '#0a0b0e';
    const initFloor = isLightInitial ? '#e6e8eb' : '#14161d';
    scene.background = new THREE.Color(initBg);
    scene.fog = new THREE.Fog(initBg, 12, 38);

    // 3. Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.copy(CAMERA_POSITIONS.three_quarter_front.pos);
    cameraRef.current = camera;

    // 4. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap was removed in three r18x

    container.appendChild(renderer.domElement);

    // 5. Studio Environment Reflection Map via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 6. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight('#fff8f0', 2.4);
    keyLight.position.set(4.5, 6, 4.5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#93c5fd', 2.0);
    rimLight.position.set(-5, 4.5, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight('#ffffff', 1.6);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    const hemiLight = new THREE.HemisphereLight('#f8fafc', '#1e293b', 1.0);
    scene.add(hemiLight);

    // 7. Reflective Studio Floor & Runway Grid
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: initFloor,
      roughness: isLightInitial ? 0.38 : 0.28,
      metalness: isLightInitial ? 0.15 : 0.55,
    });
    floorMatRef.current = floorMat;
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    const ringGeo = new THREE.RingGeometry(3.6, 3.63, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#eab308',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.004;
    scene.add(ring);

    const outerRingGeo = new THREE.RingGeometry(6.2, 6.22, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.004;
    scene.add(outerRing);

    // 8. Lamborghini Procedural 3D Model
    const carModel = new LamborghiniRevueltoModel();
    carModel.updateConfiguration(configRef.current);
    scene.add(carModel.root);
    carModelRef.current = carModel;

    // Load custom GLB model immediately on mount if provided
    if (configRef.current.customModelUrl) {
      loadCustomModel(configRef.current.customModelUrl);
    }

    // 9. OrbitControls (disable damping on software WebGL so renders settle immediately)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.8;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.target.copy(CAMERA_POSITIONS.three_quarter_front.target);
    controlsRef.current = controls;

    // 10. Coalesced On-Demand Rendering with Software-WebGL Pacing
    let rafId = 0;
    let timerId = 0;
    let disposed = false;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!sync) {
        timerId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timerId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          timerId = window.setTimeout(cb, 80);
        }
      };
      timerId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      rafId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;

        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const carMoving = carModel.animate(delta);

        if (isTransitioningCam.current) {
          if (isSoftwareGl) {
            camera.position.copy(targetCamPos.current);
            controls.target.copy(targetCamTarget.current);
            isTransitioningCam.current = false;
          } else {
            const alpha = 1 - Math.exp(-8 * delta);
            camera.position.lerp(targetCamPos.current, alpha);
            controls.target.lerp(targetCamTarget.current, alpha);

            if (
              camera.position.distanceTo(targetCamPos.current) < 0.02 &&
              controls.target.distanceTo(targetCamTarget.current) < 0.02
            ) {
              camera.position.copy(targetCamPos.current);
              controls.target.copy(targetCamTarget.current);
              isTransitioningCam.current = false;
            }
          }
        }

        const controlsChanged = controls.update();
        renderer.render(scene, camera);

        const done = () => {
          if (disposed) return;
          renderBusy = false;
          if (
            renderDirty ||
            isTransitioningCam.current ||
            carMoving ||
            (!isSoftwareGl && controlsChanged)
          ) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    requestRenderRef.current = requestRender;

    controls.addEventListener('start', () => {
      isTransitioningCam.current = false;
      onControlsInteracted?.();
    });
    controls.addEventListener('change', () => {
      requestRender();
    });

    // Initial render
    requestRender();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      requestRenderRef.current = () => {};
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      controls.dispose();
      // Invalidate in-flight loads, then free the car, fitted wheels and pack.
      loadSeq.current++;
      removeCustomModel();
      wheelTemplates.forEach((template) => template && disposeObject(template.object));
      wheelTemplates.clear();
      if (wheelPackRef.current) {
        disposeObject(wheelPackRef.current);
        wheelPackRef.current = null;
      }
      wheelPackPromiseRef.current = null;
      tyreTemplates.forEach((template) => template && disposeObject(template.object));
      tyreTemplates.clear();
      if (tyrePackRef.current) {
        disposeObject(tyrePackRef.current);
        tyrePackRef.current = null;
      }
      tyrePackPromiseRef.current = null;
      envTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      data-testid="car-viewport"
    >
      {/* Drag & Drop Visual Overlay */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-lambo-bold-black/90 border-2 border-dashed border-lambo-primary p-6 pointer-events-none">
          <UploadCloud className="w-16 h-16 text-lambo-primary animate-bounce mb-3" />
          <div className="text-xl font-bold text-white uppercase tracking-wider">
            Kéo thả file 3D (.glb / .gltf) vào đây
          </div>
          <div className="text-sm text-neutral-300 mt-1">
            Mô hình 3D sẽ được nạp trực tiếp vào Studio!
          </div>
        </div>
      )}

      {/* Loading Progress Notification */}
      {loadProgress && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0b0d11]/95 border border-lambo-primary/50 text-lambo-primary text-xs font-mono shadow-2xl">
          <CheckCircle2 className="w-4 h-4 animate-spin text-lambo-primary" />
          <span>{loadProgress}</span>
        </div>
      )}
    </div>
  );
};

