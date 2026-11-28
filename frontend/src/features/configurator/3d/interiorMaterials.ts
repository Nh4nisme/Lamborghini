import * as THREE from 'three';

/**
 * How a cabin material slot follows the selected interior trim.
 * - primary / secondary / stitching: untextured slots that take the trim colour outright.
 * - atlas: one textured material for the whole cabin (Forza-style "InteriorA" atlases);
 *   only its neutral, dark texels (leather, Alcantara, trim) are tinted, so printed
 *   symbols, red buttons, screens and gauges keep their artwork.
 */
export type InteriorRole = 'primary' | 'secondary' | 'stitching' | 'atlas';

/** UV box `[u0, v0, u1, v1]` in the atlas's texture space (glTF convention, v down). */
export type AtlasRect = [number, number, number, number];

export interface InteriorPalette {
  primary: string;
  secondary: string;
  stitching: string;
}

/** Shared uniforms per role, so a trim change is a colour update, not a shader recompile. */
export interface InteriorMaterialSet {
  primary: THREE.MeshStandardMaterial;
  secondary: THREE.MeshStandardMaterial;
  stitching: THREE.MeshStandardMaterial;
  atlasTint: { value: THREE.Color };
  /** Atlas clones made for this car, keyed by source material uuid. */
  atlasClones: Map<string, THREE.MeshStandardMaterial>;
}

const solid = (name: string, roughness: number) =>
  new THREE.MeshStandardMaterial({ name, color: '#151515', metalness: 0, roughness, envMapIntensity: 0.8 });

export function createInteriorMaterialSet(palette: InteriorPalette): InteriorMaterialSet {
  const set: InteriorMaterialSet = {
    primary: solid('ConfiguratorInteriorPrimary', 0.82),
    secondary: solid('ConfiguratorInteriorSecondary', 0.6),
    stitching: solid('ConfiguratorInteriorStitching', 0.7),
    atlasTint: { value: new THREE.Color('#151515') },
    atlasClones: new Map(),
  };
  applyInteriorPalette(set, palette);
  return set;
}

export function applyInteriorPalette(set: InteriorMaterialSet, palette: InteriorPalette) {
  set.primary.color.set(palette.primary);
  set.secondary.color.set(palette.secondary);
  set.stitching.color.set(palette.stitching);
  set.atlasTint.value.set(palette.primary);
}

/**
 * Clone of an atlas material whose neutral dark texels are recoloured with the
 * shared tint. Texture values are linear here: the cabin's grey leather sits
 * around luma 0.03, printed symbols above 0.5, screens near 0, and red buttons
 * have high relative saturation, so the mask keeps those untouched.
 */
function createAtlasClone(
  source: THREE.MeshStandardMaterial,
  tint: { value: THREE.Color },
  keepRects: AtlasRect[]
): THREE.MeshStandardMaterial {
  const material = source.clone();
  // UV boxes (e.g. a screen swatch that shares the leather grey) that must never be tinted.
  const keepTest = keepRects
    .map(
      ([u0, v0, u1, v1]) =>
        `if (vMapUv.x >= ${u0.toFixed(4)} && vMapUv.x <= ${u1.toFixed(4)} && vMapUv.y >= ${v0.toFixed(4)} && vMapUv.y <= ${v1.toFixed(4)}) keep = 0.0;`
    )
    .join('\n          ');
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uInteriorTint = tint;
    shader.fragmentShader =
      'uniform vec3 uInteriorTint;\n' +
      shader.fragmentShader.replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        {
          vec3 texel = diffuseColor.rgb;
          float luma = dot(texel, vec3(0.2126, 0.7152, 0.0722));
          float hi = max(max(texel.r, texel.g), texel.b);
          float lo = min(min(texel.r, texel.g), texel.b);
          float relSat = (hi - lo) / (hi + 1e-4);
          float neutral = 1.0 - smoothstep(0.18, 0.32, relSat);
          float dark = 1.0 - smoothstep(0.12, 0.25, luma);
          // Near-black texels are screens, gaps and vent slats: leave them black.
          float notBlack = smoothstep(0.004, 0.010, luma);
          float keep = 1.0;
          ${keepTest}
          float mask = neutral * dark * notBlack * keep;
          vec3 recoloured = uInteriorTint * clamp(luma / 0.035, 0.35, 1.8);
          diffuseColor.rgb = mix(texel, recoloured, mask);
        }`
      );
  };
  material.customProgramCacheKey = () => `configurator-interior-atlas|${keepTest}`;
  material.needsUpdate = true;
  return material;
}

/** Returns the material that should replace `source` for the given role. */
export function interiorMaterialFor(
  set: InteriorMaterialSet,
  role: InteriorRole,
  source: THREE.Material,
  atlasKeepRects: AtlasRect[] = []
): THREE.Material {
  if (role === 'primary') return set.primary;
  if (role === 'secondary') return set.secondary;
  if (role === 'stitching') return set.stitching;
  if (!(source instanceof THREE.MeshStandardMaterial) || !source.map) return source;
  let clone = set.atlasClones.get(source.uuid);
  if (!clone) {
    clone = createAtlasClone(source, set.atlasTint, atlasKeepRects);
    set.atlasClones.set(source.uuid, clone);
  }
  return clone;
}

export function disposeInteriorMaterialSet(set: InteriorMaterialSet) {
  set.primary.dispose();
  set.secondary.dispose();
  set.stitching.dispose();
  set.atlasClones.forEach((material) => material.dispose());
  set.atlasClones.clear();
}
