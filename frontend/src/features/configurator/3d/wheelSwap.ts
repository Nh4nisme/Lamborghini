import * as THREE from 'three';

/** Wheel-pack node used as the replacement tyre when a car's rim mesh also contains its tyre. */
export const TYRE_NODE_NAME = 'Cylinder_6';

/** Pack of selectable tyres (option group 6). */
export const TYRE_PACK_URL = '/models/free_sport_tire_pack_-_by_sdc-v1.glb';

/**
 * Bore / outer-diameter ratio every fitted tyre is given (that of TYRE_NODE_NAME).
 * The rim is sized from it, so swapping tyres never changes the rim.
 */
export const TYRE_BORE_RATIO = 0.853;

/**
 * A wheel-pack part normalised to a canonical frame: centred on the origin,
 * axle along X, outer face toward +X.
 */
export interface WheelTemplate {
  object: THREE.Group;
  /** Extent along the axle. */
  width: number;
  /** Outer diameter. */
  diameter: number;
  /** Smallest / largest radial distance from the axle. For a tyre this is its bore. */
  innerRatio: number;
}

/** One wheel found on the car, in world space. */
export interface DetectedWheel {
  center: THREE.Vector3;
  diameter: number;
  width: number;
  /** +1 when the wheel sits on the car's +X side. */
  side: 1 | -1;
}

const vertex = new THREE.Vector3();

/**
 * Visits every vertex in world space. getVertexPosition() applies skinning and
 * morph targets: the SC18 wheels are skinned meshes placed by bones, so the raw
 * buffer positions alone land in the wrong spot.
 */
function forEachMeshVertex(mesh: THREE.Mesh, callback: (v: THREE.Vector3) => void) {
  const position = mesh.geometry.getAttribute('position');
  if (!position) return;
  for (let i = 0; i < position.count; i++) {
    mesh.getVertexPosition(i, vertex).applyMatrix4(mesh.matrixWorld);
    callback(vertex);
  }
}

function forEachVertex(root: THREE.Object3D, callback: (v: THREE.Vector3) => void) {
  root.updateMatrixWorld(true);
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) forEachMeshVertex(child, callback);
  });
}

type Axis = 'x' | 'y' | 'z';

/**
 * Rotation whose columns are the principal axes of the vertex cloud (Jacobi
 * eigen-decomposition of the 3x3 covariance). A rotationally symmetric wheel
 * always has its axle as one of these axes, whatever its pose.
 */
function principalAxes(root: THREE.Object3D): THREE.Matrix4 {
  const mean = new THREE.Vector3();
  let count = 0;
  forEachVertex(root, (v) => {
    mean.add(v);
    count++;
  });
  if (count === 0) return new THREE.Matrix4();
  mean.divideScalar(count);

  const a = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  forEachVertex(root, (v) => {
    const d = [v.x - mean.x, v.y - mean.y, v.z - mean.z];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) a[i][j] += d[i] * d[j];
  });

  const e = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let sweep = 0; sweep < 50; sweep++) {
    let p = 0;
    let q = 1;
    if (Math.abs(a[0][2]) > Math.abs(a[p][q])) [p, q] = [0, 2];
    if (Math.abs(a[1][2]) > Math.abs(a[p][q])) [p, q] = [1, 2];
    if (Math.abs(a[p][q]) < 1e-12 * (Math.abs(a[p][p]) + Math.abs(a[q][q]) + 1e-30)) break;

    const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
    const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
    const c = 1 / Math.sqrt(t * t + 1);
    const s = t * c;
    for (let k = 0; k < 3; k++) {
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = c * akp - s * akq;
      a[k][q] = s * akp + c * akq;
    }
    for (let k = 0; k < 3; k++) {
      const apk = a[p][k];
      const aqk = a[q][k];
      a[p][k] = c * apk - s * aqk;
      a[q][k] = s * apk + c * aqk;
    }
    for (let k = 0; k < 3; k++) {
      const ekp = e[k][p];
      const ekq = e[k][q];
      e[k][p] = c * ekp - s * ekq;
      e[k][q] = s * ekp + c * ekq;
    }
  }

  const basis = new THREE.Matrix4().set(
    e[0][0], e[0][1], e[0][2], 0,
    e[1][0], e[1][1], e[1][2], 0,
    e[2][0], e[2][1], e[2][2], 0,
    0, 0, 0, 1
  );
  // Keep it a proper rotation so decompose() does not see a mirror.
  if (basis.determinant() < 0) basis.multiply(new THREE.Matrix4().makeScale(1, 1, -1));
  return basis;
}

/**
 * Finds the axle of an axis-aligned wheel. Looking down the axle the outline is
 * a circle, so the farthest vertex sits at half the box side (ratio ~0.71 of the
 * half-diagonal); seen from any other axis the outline is a rectangle and the
 * farthest vertex reaches the corner (ratio ~1). Extents alone cannot tell,
 * because the pack's rims are about as deep as they are wide.
 * A low score also means the wheel really is axis-aligned in this frame.
 */
function measureAxle(root: THREE.Object3D): { axle: Axis; score: number; center: THREE.Vector3 } {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root, true);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxRadius = { x: 0, y: 0, z: 0 };
  forEachVertex(root, (v) => {
    const x = v.x - center.x;
    const y = v.y - center.y;
    const z = v.z - center.z;
    maxRadius.x = Math.max(maxRadius.x, Math.hypot(y, z));
    maxRadius.y = Math.max(maxRadius.y, Math.hypot(x, z));
    maxRadius.z = Math.max(maxRadius.z, Math.hypot(x, y));
  });
  const halfDiagonal = {
    x: Math.hypot(size.y, size.z) / 2,
    y: Math.hypot(size.x, size.z) / 2,
    z: Math.hypot(size.x, size.y) / 2,
  };
  let axle: Axis = 'x';
  let score = Infinity;
  (['x', 'y', 'z'] as const).forEach((axis) => {
    const ratio = maxRadius[axis] / Math.max(halfDiagonal[axis], 1e-6);
    if (ratio < score) {
      score = ratio;
      axle = axis;
    }
  });
  return { axle, score, center };
}

/**
 * Copies a wheel-pack node into a canonical template. Geometry is shared with the
 * pack; materials are cloned so tinting one template never leaks into another.
 */
export function buildWheelTemplate(pack: THREE.Object3D, nodeName: string): WheelTemplate | null {
  pack.updateMatrixWorld(true);
  const node = pack.getObjectByName(THREE.PropertyBinding.sanitizeNodeName(nodeName));
  if (!node) return null;

  const copy = node.clone(true);
  copy.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone();
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const orient = new THREE.Group();
  const flip = new THREE.Group();
  const root = new THREE.Group();
  orient.add(copy);
  flip.add(orient);
  root.add(flip);

  // Pack nodes are posed at arbitrary tilts. Most wheels are axis-aligned in their
  // own frame (keep only the node's scale), some in the pack's world frame, and
  // some in neither, which the principal-axes frame handles.
  // Use whichever frame shows the most circular face.
  const applyWorldFrame = () => node.matrixWorld.decompose(copy.position, copy.quaternion, copy.scale);
  applyWorldFrame();
  const unrotate = principalAxes(root).invert();
  const principalWorld = unrotate.multiply(node.matrixWorld);
  const frames = [
    () => {
      copy.position.set(0, 0, 0);
      copy.quaternion.identity();
      copy.scale.copy(node.scale);
    },
    applyWorldFrame,
    () => principalWorld.decompose(copy.position, copy.quaternion, copy.scale),
  ];
  let best: { frame: () => void; axle: Axis; score: number } | null = null;
  for (const frame of frames) {
    frame();
    const measured = measureAxle(root);
    if (!best || measured.score < best.score) best = { frame, axle: measured.axle, score: measured.score };
  }
  if (!best || !Number.isFinite(best.score)) return null;
  best.frame();
  const { axle, center } = measureAxle(root);
  copy.position.sub(center);

  if (axle === 'y') orient.rotation.z = Math.PI / 2;
  else if (axle === 'z') orient.rotation.y = Math.PI / 2;

  // Spokes sit near the outer face, so the vertex mass leans toward it.
  let sumX = 0;
  let count = 0;
  forEachVertex(root, (v) => {
    sumX += v.x;
    count++;
  });
  if (count > 0 && sumX / count < 0) flip.rotation.y = Math.PI;

  let minRadius = Infinity;
  let maxRadius = 0;
  forEachVertex(root, (v) => {
    const r = Math.hypot(v.y, v.z);
    if (r < minRadius) minRadius = r;
    if (r > maxRadius) maxRadius = r;
  });

  const size = new THREE.Box3().setFromObject(root, true).getSize(new THREE.Vector3());
  return {
    object: root,
    width: size.x,
    diameter: Math.max(size.y, size.z),
    innerRatio: maxRadius > 0 ? minRadius / maxRadius : 0,
  };
}

/**
 * Reshapes a tyre template so its bore is `boreRatio` of its outer diameter,
 * keeping the outer diameter and tread. Pack tyres have different sidewall
 * heights (bores of 0.78-0.85); without this the rim would have to change size
 * with every tyre. Geometry is baked into the template frame and cloned, so the
 * source pack is untouched.
 */
export function fitTyreToBore(template: WheelTemplate, boreRatio: number): WheelTemplate {
  const root = new THREE.Group();
  template.object.updateMatrixWorld(true);

  let minRadius = Infinity;
  let maxRadius = 0;
  forEachVertex(template.object, (v) => {
    const r = Math.hypot(v.y, v.z);
    if (r < minRadius) minRadius = r;
    if (r > maxRadius) maxRadius = r;
  });
  const targetMin = maxRadius * boreRatio;
  const span = maxRadius - minRadius;

  template.object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const geometry = child.geometry.clone();
    geometry.applyMatrix4(child.matrixWorld);
    const position = geometry.getAttribute('position');
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);
      const z = position.getZ(i);
      const r = Math.hypot(y, z);
      if (r === 0 || span <= 0) continue;
      // Map [minRadius, maxRadius] linearly onto [targetMin, maxRadius].
      const fitted = targetMin + ((r - minRadius) / span) * (maxRadius - targetMin);
      const k = fitted / r;
      position.setY(i, y * k);
      position.setZ(i, z * k);
    }
    position.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const mesh = new THREE.Mesh(geometry, child.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  });

  return { object: root, width: template.width, diameter: template.diameter, innerRatio: boreRatio };
}

/** Removes printed sidewall lettering (textured materials) for a plain black sidewall. */
export function stripTyreLettering(template: WheelTemplate) {
  template.object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial && material.map) {
        material.map = null;
        material.color.set('#0b0b0b');
        material.needsUpdate = true;
      }
    });
  });
}

/**
 * Groups the original rim meshes into up to four wheels by splitting their
 * world-space vertices around the rims' common centre. Works when one mesh
 * spans several wheels, which is the case for the Revuelto and Urus exports.
 * Expects a car whose length runs along Z.
 */
export function detectWheels(meshes: THREE.Mesh[]): DetectedWheel[] {
  if (meshes.length === 0) return [];
  meshes.forEach((mesh) => mesh.updateWorldMatrix(true, false));

  const overall = new THREE.Box3();
  meshes.forEach((mesh) => forEachMeshVertex(mesh, (v) => overall.expandByPoint(v)));
  if (overall.isEmpty()) return [];
  const split = overall.getCenter(new THREE.Vector3());

  const buckets = new Map<string, THREE.Box3>();
  meshes.forEach((mesh) =>
    forEachMeshVertex(mesh, (v) => {
      const key = `${v.x >= split.x ? 'R' : 'L'}${v.z >= split.z ? 'F' : 'B'}`;
      let box = buckets.get(key);
      if (!box) {
        box = new THREE.Box3();
        buckets.set(key, box);
      }
      box.expandByPoint(v);
    })
  );

  const wheels: DetectedWheel[] = [];
  buckets.forEach((box) => {
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const diameter = Math.max(size.y, size.z);
    if (diameter <= 0 || size.x <= 0) return;
    wheels.push({ center, diameter, width: size.x, side: center.x >= split.x ? 1 : -1 });
  });
  return wheels;
}

/** Places a template on a detected wheel, scaled to the given diameter and facing outward. */
export function createWheelInstance(template: WheelTemplate, wheel: DetectedWheel, diameter: number): THREE.Object3D {
  const instance = template.object.clone(true);
  const scale = diameter / template.diameter;
  const widthScale = THREE.MathUtils.clamp(wheel.width / template.width, scale * 0.5, scale * 1.5);
  instance.scale.set(widthScale, scale, scale);
  instance.position.copy(wheel.center);
  instance.rotation.y = wheel.side < 0 ? Math.PI : 0;
  return instance;
}

/** Metalness/roughness for a rim finish label such as `Diamond Cut` or `Matt Bronze`. */
export function rimSurfaceFor(finish: string): { metalness: number; roughness: number } {
  const key = finish.toLowerCase();
  return {
    metalness: key.includes('diamond') ? 0.95 : 0.88,
    roughness: key.includes('matt') ? 0.45 : 0.18,
  };
}

/** Applies the rim colour and finish to the template's rim-body materials. */
export function tintWheelTemplate(template: WheelTemplate, hex: string, finish = '') {
  const color = new THREE.Color(hex);
  const surface = rimSurfaceFor(finish);
  template.object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const name = material.name.toLowerCase();
      if (!/jante|chrome|rim|spoke/.test(name)) return;
      if (material instanceof THREE.MeshStandardMaterial) {
        material.color.copy(color);
        material.metalness = surface.metalness;
        material.roughness = surface.roughness;
        material.needsUpdate = true;
      }
    });
  });
}

/** Releases GPU resources held by an object tree (geometry, materials, textures). */
export function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!material) return;
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) value.dispose();
      });
      material.dispose();
    });
  });
}
