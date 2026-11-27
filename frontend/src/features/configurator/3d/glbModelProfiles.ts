import * as THREE from 'three';

/**
 * Per-GLB knowledge the configurator needs but cannot infer from names alone.
 *
 * The Sketchfab exports in `public/models` use meaningless material names
 * (`Material.072`, `Object_13`, ...) and share materials between unrelated
 * parts, so body paint and rims are matched per mesh here. Mesh names are the
 * ones three.js produces, i.e. already sanitized (`yellow.002` -> `yellow002`).
 * Material names are kept verbatim by GLTFLoader.
 */
export interface GlbModelProfile {
  /** Y rotation (radians) that turns the car's nose toward +Z, as the camera presets expect. */
  rotationY: number;
  /** True for a mesh material slot that should receive the exterior paint. */
  isBody: (mesh: THREE.Mesh, material: THREE.Material) => boolean;
  /** True for a mesh that is part of an original rim and is hidden when a wheel-pack rim is fitted. */
  isRim: (mesh: THREE.Mesh, material: THREE.Material) => boolean;
  /** True for a mesh material slot that should take the brake caliper colour. */
  isCaliper: (mesh: THREE.Mesh, material: THREE.Material) => boolean;
  /** The rim meshes also contain the tyre, so a replacement tyre must be fitted too. */
  rimIncludesTyre: boolean;
}

const oneOf = (names: string[]) => (_mesh: THREE.Mesh, material: THREE.Material) => names.includes(material.name);

const GENERIC_PROFILE: GlbModelProfile = {
  rotationY: 0,
  isBody: (_mesh, material) => {
    const name = material.name.toLowerCase();
    const looksLikePaint = /oempaint|carpaint|paint|coloured|body/.test(name);
    const isOtherPart = /brake|break|caliper|black/.test(name);
    return looksLikePaint && !isOtherPart;
  },
  isRim: (mesh, material) => {
    const name = `${mesh.name} ${material.name}`.toLowerCase();
    const looksLikeRim = /rim|jante|wheel/.test(name);
    const isOtherPart = /tire|tyre|pneu|pzeo|brake|break|disc|caliper|frein|etrier/.test(name);
    return looksLikeRim && !isOtherPart;
  },
  isCaliper: (_mesh, material) => {
    const name = material.name.toLowerCase();
    // Badges are textured decals that sit on the caliper; they keep their artwork.
    if (name.includes('badge')) return false;
    return name.includes('caliper') || name.includes('etrier');
  },
  rimIncludesTyre: false,
};

const PROFILES: Record<string, GlbModelProfile> = {
  'revuelto_30tm-v8.glb': {
    // Modelled along X with the nose at -X.
    rotationY: Math.PI / 2,
    // Material.072 is the whole body shell; MAT_CarpaintMain only covers the rear wing accent.
    isBody: oneOf(['Material.072']),
    isRim: oneOf(['Rim_Texture', 'CRBN_JANTE', 'visse.002', 'BLEU_DETAILS.002']),
    // One mesh holding all four calipers.
    isCaliper: oneOf(['Material.014']),
    rimIncludesTyre: false,
  },
  'urus_absoluttm-v5.glb': {
    rotationY: 0,
    // `Material` is shared by the body, glass trim and wheels; only the `yellow*` meshes are body panels.
    isBody: (mesh, material) => /^yellow/i.test(mesh.name) && material.name === 'Material',
    isRim: (mesh, material) =>
      /^<Wheel00[12]_/.test(mesh.name) &&
      ['Material', 'Material.054', 'Material.053', 'CRBN_JANTE.005', 'visse.015'].includes(material.name),
    // This export has no solid caliper: the purple SDC brake accents (all four discs) and the
    // front caliper shells stand in for it. `BreaksRedPaint` is a rear trim strip, not a caliper.
    isCaliper: (mesh, material) =>
      /^<Wheel00[12]_/.test(mesh.name) &&
      ['SDC.002', 'SDC.003', 'CRBN_JANTE.009', 'Material.082', 'Material.081'].includes(material.name),
    rimIncludesTyre: false,
  },
  'huracan_eagletm-v1.glb': {
    // Nose at -Z.
    rotationY: Math.PI,
    isBody: oneOf(['Material.001', 'Material.005']),
    // Material.041 is also used by the rear diffuser, so match the rim meshes by name.
    isRim: (mesh) => /^Object_(13|14|16|22)$/.test(mesh.name),
    // `Default.001` on Object_18 holds all four calipers.
    isCaliper: (mesh) => mesh.name === 'Object_18',
    rimIncludesTyre: false,
  },
  'lamborghini_sc18_draco.glb': {
    rotationY: 0,
    isBody: oneOf(['OEMPaint']),
    isRim: oneOf(['Wheel1A']),
    // Outer and inner caliper halves; CaliperBadgeA is only the logo decal.
    isCaliper: oneOf(['PaletteMaterial001', 'PaletteMaterial002']),
    rimIncludesTyre: true,
  },
};

/** Returns the profile for a model URL, falling back to name heuristics for dropped-in files. */
export function getGlbModelProfile(url: string): GlbModelProfile {
  const fileName = url.split(/[?#]/)[0].split('/').pop()?.toLowerCase() ?? '';
  return PROFILES[fileName] ?? GENERIC_PROFILE;
}
