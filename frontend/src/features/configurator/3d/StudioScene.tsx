import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { CarConfiguration, CameraPreset } from '../types';
import { LamborghiniRevueltoModel } from './CarModel';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface StudioSceneProps {
  config: CarConfiguration;
  activeCameraPreset: CameraPreset;
  theme?: 'light' | 'dark';
  onControlsInteracted?: () => void;
  onModelLoaded?: (modelName: string, objectUrl: string) => void;
}

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
  const interiorMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const carbonMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lightMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const requestRenderRef = useRef<() => void>(() => {});
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [loadProgress, setLoadProgress] = useState<string | null>(null);

  // Reusable loader for GLB files with Draco decompression support
  const loadCustomModel = (url: string) => {
    if (!sceneRef.current) return;

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
        if (!sceneRef.current) return;

        // Hide procedural model when custom GLB is loaded
        if (carModelRef.current) {
          carModelRef.current.root.visible = false;
        }

        // Remove previous custom model
        if (customModelGroupRef.current) {
          sceneRef.current.remove(customModelGroupRef.current);
        }

        const model = gltf.scene;

        // Reset material buckets
        bodyMaterialsRef.current = [];
        caliperMaterialsRef.current = [];
        wheelMaterialsRef.current = [];
        interiorMaterialsRef.current = [];
        carbonMaterialsRef.current = [];
        lightMaterialsRef.current = [];

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

        // Traverse to categorize materials for SC18 Alston & generic models
        const currentCfg = configRef.current;
        const paintColor = new THREE.Color(currentCfg.exteriorColor.hex);
        const caliperColor = new THREE.Color(currentCfg.caliper.hex);
        const wheelColor = new THREE.Color(currentCfg.rim.hex);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const mat = child.material;
            if (mat) {
              const materials = Array.isArray(mat) ? mat : [mat];
              materials.forEach((m) => {
                const name = (m.name || '').toLowerCase();
                const mStandard = m as THREE.MeshStandardMaterial;

                // Body Paint (OEMPaint, Coloured, Paint, Body)
                if (
                  name === 'oempaint' ||
                  name.includes('paint') ||
                  name === 'coloured' ||
                  name.includes('body')
                ) {
                  bodyMaterialsRef.current.push(mStandard);
                  if ('color' in mStandard) {
                    mStandard.color.copy(paintColor);
                    mStandard.roughness = currentCfg.exteriorColor.roughness;
                    mStandard.metalness = currentCfg.exteriorColor.metalness;
                  }
                }
                // Brake Calipers
                else if (name.includes('caliper')) {
                  caliperMaterialsRef.current.push(mStandard);
                  if ('color' in mStandard) mStandard.color.copy(caliperColor);
                }
                // Wheels / Rims
                else if (name.includes('wheel') || name.includes('rim')) {
                  wheelMaterialsRef.current.push(mStandard);
                  if ('color' in mStandard) mStandard.color.copy(wheelColor);
                }
                // Interior
                else if (name.includes('interior')) {
                  interiorMaterialsRef.current.push(mStandard);
                }
                // Carbon parts
                else if (name.includes('carbon')) {
                  carbonMaterialsRef.current.push(mStandard);
                }
                // Lights
                else if (name.includes('light')) {
                  lightMaterialsRef.current.push(mStandard);
                }
              });
            }
          }
        });

        sceneRef.current.add(model);
        customModelGroupRef.current = model;
        setLoadProgress(null);
        requestRenderRef.current();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(`Loading 3D model ${pct}%`);
        }
      },
      (error) => {
        dracoLoader.dispose();
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
      mat.metalness = config.rim.id.includes('diamond') ? 0.95 : 0.88;
      mat.roughness = config.rim.id.includes('matt') ? 0.45 : 0.18;
      mat.needsUpdate = true;
    });

    const interiorColor = new THREE.Color(config.interiorTrim.secondaryLeatherHex);
    interiorMaterialsRef.current.forEach((mat) => {
      mat.color.copy(interiorColor);
      mat.needsUpdate = true;
    });

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
      if (customModelGroupRef.current && sceneRef.current) {
        sceneRef.current.remove(customModelGroupRef.current);
        customModelGroupRef.current = null;
      }
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

