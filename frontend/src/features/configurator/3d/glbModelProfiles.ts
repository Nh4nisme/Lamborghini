import * as THREE from 'three';
import type { AtlasRect, InteriorRole } from './interiorMaterials';

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
  /** How a cabin material slot follows the interior trim; null leaves it untouched. */
  interiorRole: (mesh: THREE.Mesh, material: THREE.Material) => InteriorRole | null;
  /** Atlas UV boxes that look like leather but must keep their colour (e.g. a screen swatch). */
  atlasKeepRects?: AtlasRect[];
}

const oneOf = (names: string[]) => (_mesh: THREE.Mesh, material: THREE.Material) => names.includes(material.name);

/** Material names from the "Reward" exports end in `<Part>_Material`, after a long car prefix. */
const rewardPart = (part: string) => (_mesh: THREE.Mesh, material: THREE.Material) =>
  material.name.endsWith(`${part}_Material`);

const meshNamed = (pattern: RegExp) => (mesh: THREE.Mesh) => pattern.test(mesh.name);

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
  interiorRole: (_mesh, material) => (/interior/i.test(material.name) ? 'atlas' : null),
};

/** Revuelto (`lamborghini_revuelto-v1.glb`): per-wheel CarPaintBlack meshes form the rims. */
const REVUELTO_RIM_MESH = /^Object_(559|562|577|580|583|586|589|592|641|644|647|650)$/;
/** CarPaintBlack caliper bodies; the white `Bianco` lettering on them is left alone. */
const REVUELTO_CALIPER_MESH = /^Object_(1132|1135|1141|1150)$/;

const REVUELTO_INTERIOR: Record<string, InteriorRole> = {
  Alcantara: 'primary',
  AlcantaraForato: 'primary',
  PelleNera: 'primary',
  PelleArancio: 'secondary',
  Cuciture_Arancio: 'stitching',
  Cuciture_nere: 'stitching',
};

const PROFILES: Record<string, GlbModelProfile> = {
  'lamborghini_revuelto-v1.glb': {
    // Modelled along X with the nose at -X.
    rotationY: Math.PI / 2,
    isBody: oneOf(['MAT_CarpaintMain']),
    // CarPaintBlack is also used for intakes and trim, so the rims are matched per mesh.
    isRim: (mesh, material) =>
      REVUELTO_RIM_MESH.test(mesh.name) ||
      ['ext_logo_dark', 't_rims_black_shiny', 't_rims_titanium_matt', 'Rubber_base'].includes(material.name),
    isCaliper: meshNamed(REVUELTO_CALIPER_MESH),
    // Tyres (`Wheel_001`) are separate meshes and stay in place.
    rimIncludesTyre: false,
    interiorRole: (_mesh, material) => REVUELTO_INTERIOR[material.name] ?? null,
  },
  '2019_lamborghini_huracan-v3.glb': {
    rotationY: 0,
    // `Coloured` is the black roof edge, wing and window trim, not body paint.
    isBody: rewardPart('PaintB'),
    // `Wheel1A` is the whole wheel, tyre included.
    isRim: (_mesh, material) => /Wheel1A/.test(material.name),
    isCaliper: rewardPart('CallipersCalliperGloss'),
    rimIncludesTyre: true,
    interiorRole: (_mesh, material) => (/InteriorA_Material$|InteriorTillingA_Material$/.test(material.name) ? 'atlas' : null),
  },
  '2023_lamborghini_urus_performante-v2.glb': {
    rotationY: 0,
    isBody: rewardPart('Paint'),
    isRim: (_mesh, material) => /Wheel1A/.test(material.name),
    isCaliper: rewardPart('CallipersCalliperA_Zone'),
    rimIncludesTyre: true,
    interiorRole: (_mesh, material) => (/InteriorA_Material$/.test(material.name) ? 'atlas' : null),
    // Infotainment screen: a flat swatch in the same grey as the leather.
    atlasKeepRects: [[0.3066, 0.2168, 0.3555, 0.2656]],
  },
  'revuelto_30tm-v8.glb': {
    // Modelled along X with the nose at -X.
    rotationY: Math.PI / 2,
    // Material.072 is the whole body shell; MAT_CarpaintMain only covers the rear wing accent.
    isBody: oneOf(['Material.072']),
    isRim: oneOf(['Rim_Texture', 'CRBN_JANTE', 'visse.002', 'BLEU_DETAILS.002']),
    // One mesh holding all four calipers.
    isCaliper: oneOf(['Material.014']),
    rimIncludesTyre: false,
    interiorRole: () => null,
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
    interiorRole: () => null,
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
    interiorRole: () => null,
  },
  'lamborghini_sc18_draco.glb': {
    rotationY: 0,
    isBody: oneOf(['OEMPaint']),
    isRim: oneOf(['Wheel1A']),
    // Outer and inner caliper halves; CaliperBadgeA is only the logo decal.
    isCaliper: oneOf(['PaletteMaterial001', 'PaletteMaterial002']),
    rimIncludesTyre: true,
    // InteriorColour1A shares the InteriorA atlas; both are tinted through it.
    interiorRole: (_mesh, material) => (/^Interior(A|Colour1A)$/.test(material.name) ? 'atlas' : null),
  },
};

/** Returns the profile for a model URL, falling back to name heuristics for dropped-in files. */
export function getGlbModelProfile(url: string): GlbModelProfile {
  const fileName = url.split(/[?#]/)[0].split('/').pop()?.toLowerCase() ?? '';
  return PROFILES[fileName] ?? GENERIC_PROFILE;
}
