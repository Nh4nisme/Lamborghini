import * as THREE from 'three';
import type { CarConfiguration } from '../types';

/**
 * Procedural Carbon Fiber Texture Generator
 */
function createCarbonTexture(shiny: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = shiny ? '#141417' : '#1b1c20';
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = shiny ? '#262830' : '#2b2d35';
  for (let y = 0; y < 64; y += 8) {
    for (let x = 0; x < 64; x += 8) {
      if ((x + y) % 16 === 0) {
        ctx.fillRect(x, y, 4, 4);
        ctx.fillRect(x + 4, y + 4, 4, 4);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class LamborghiniRevueltoModel {
  public root: THREE.Group;

  // Dynamic mesh references for updating colors/finishes
  private bodyMeshes: THREE.Mesh[] = [];
  private lowerCarbonMeshes: THREE.Mesh[] = [];
  private upperCarbonMeshes: THREE.Mesh[] = [];
  private rimMeshes: THREE.Mesh[] = [];
  private caliperMeshes: THREE.Mesh[] = [];
  private exhaustMeshes: THREE.Mesh[] = [];
  private interiorLeatherMeshes: THREE.Mesh[] = [];
  private interiorAccentMeshes: THREE.Mesh[] = [];
  private lightEmissiveMeshes: THREE.Mesh[] = [];
  private tailLightMeshes: THREE.Mesh[] = [];

  // Animated parts
  private leftDoorGroup: THREE.Group = new THREE.Group();
  private rightDoorGroup: THREE.Group = new THREE.Group();
  private spoilerGroup: THREE.Group = new THREE.Group();

  // Animation states
  private targetDoorAngle = 0;
  private currentDoorAngle = 0;
  private targetSpoilerHeight = 0;
  private currentSpoilerHeight = 0;
  private targetSpoilerPitch = 0;
  private currentSpoilerPitch = 0;

  // Textures
  private shinyCarbonTex = createCarbonTexture(true);
  private mattCarbonTex = createCarbonTexture(false);

  constructor() {
    this.root = new THREE.Group();
    this.buildSupercar();
  }

  private buildSupercar() {
    this.buildContactShadow();
    this.buildMainBodyAndChassis();
    this.buildAerodynamicsAndSplitters();
    this.buildScissorDoors();
    this.buildActiveSpoiler();
    this.buildYHeadlightsAndTaillights();
    this.buildV12EngineBay();
    this.buildCockpitInterior();
    this.buildWheelsAndBrakes();
    this.buildExhaustSystem();
  }

  /**
   * Ground Contact Shadow Plane
   */
  private buildContactShadow() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(0.85, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(5.2, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.005;
    this.root.add(shadowMesh);
  }

  /**
   * Main Low-Slung Supercar Bodywork
   */
  private buildMainBodyAndChassis() {
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffcc00'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // 1. Central Monocoque Tub (Main floor pan between wheels)
    const tub = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.24, 2.8), bodyMat);
    tub.position.set(0, 0.26, 0.05);
    tub.castShadow = true;
    tub.receiveShadow = true;
    this.root.add(tub);
    this.bodyMeshes.push(tub);

    // 2. Front Sloping Wedge Hood (Sloping from cowl down to nose)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.18, 1.35), bodyMat);
    hood.position.set(0, 0.42, 1.3);
    hood.rotation.x = 0.14; // Angled wedge downward
    hood.castShadow = true;
    this.root.add(hood);
    this.bodyMeshes.push(hood);

    // Front Bumper Fascia & Intake Grille Surround
    const frontFascia = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.22, 0.5), bodyMat);
    frontFascia.position.set(0, 0.26, 2.05);
    frontFascia.castShadow = true;
    this.root.add(frontFascia);
    this.bodyMeshes.push(frontFascia);

    // Black Recessed Front Air Intakes (Radiator air dams)
    const intakeMat = new THREE.MeshStandardMaterial({ color: '#090a0d', roughness: 0.8 });
    [-0.52, 0.52].forEach((x) => {
      const airDam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.15), intakeMat);
      airDam.position.set(x, 0.22, 2.22);
      this.root.add(airDam);
    });

    // 3. Front Flared Fenders (Over front wheels)
    [-0.85, 0.85].forEach((x) => {
      const frontFender = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.95), bodyMat);
      frontFender.position.set(x, 0.44, 1.4);
      frontFender.castShadow = true;
      this.root.add(frontFender);
      this.bodyMeshes.push(frontFender);
    });

    // 4. Rear Quarter Panels & Flared Haunches (Over rear wheels)
    [-0.88, 0.88].forEach((x) => {
      const rearFender = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.38, 1.35), bodyMat);
      rearFender.position.set(x, 0.46, -1.3);
      rearFender.castShadow = true;
      this.root.add(rearFender);
      this.bodyMeshes.push(rearFender);
    });

    // 5. Rear Engine Decklid & Louvered Cover
    const rearDeck = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.35), bodyMat);
    rearDeck.position.set(0, 0.48, -1.25);
    rearDeck.rotation.x = -0.08;
    rearDeck.castShadow = true;
    this.root.add(rearDeck);
    this.bodyMeshes.push(rearDeck);

    // 6. Cabin Greenhouse (Roof & Glass Canopy)
    const roofMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffcc00'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
    });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.08, 1.25), roofMat);
    roof.position.set(0, 0.86, -0.05);
    roof.castShadow = true;
    this.root.add(roof);
    this.upperCarbonMeshes.push(roof);

    // Glass Canopy Windshield & Windows
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0a0e14'),
      metalness: 0.1,
      roughness: 0.04,
      transparent: true,
      opacity: 0.74,
      reflectivity: 0.95,
    });

    // Windshield (sloping from hood to roof)
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.04, 0.75), glassMat);
    windshield.position.set(0, 0.72, 0.52);
    windshield.rotation.x = 0.56;
    windshield.castShadow = true;
    this.root.add(windshield);

    // Rear Engine Glass
    const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.04, 0.65), glassMat);
    rearGlass.position.set(0, 0.74, -0.68);
    rearGlass.rotation.x = -0.42;
    this.root.add(rearGlass);

    // Side Windows
    [-0.58, 0.58].forEach((x) => {
      const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.95), glassMat);
      sideGlass.position.set(x, 0.72, -0.05);
      this.root.add(sideGlass);
    });

    // Side Mirrors
    [-1, 1].forEach((dir) => {
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.02, 0.16, 6),
        new THREE.MeshStandardMaterial({ color: '#15171c', roughness: 0.2 })
      );
      stalk.position.set(dir * 0.72, 0.65, 0.48);
      stalk.rotation.z = dir * -0.65;

      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.11), roofMat);
      cap.position.set(dir * 0.84, 0.7, 0.48);
      cap.rotation.y = dir * 0.12;

      this.root.add(stalk);
      this.root.add(cap);
      this.upperCarbonMeshes.push(cap);
    });
  }

  /**
   * Aerodynamics: Front Splitter, Side Skirts, Rear Race Diffuser
   */
  private buildAerodynamicsAndSplitters() {
    const carbonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141416'),
      roughness: 0.25,
      metalness: 0.5,
      map: this.shinyCarbonTex,
    });

    // Front Splitter
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.035, 0.42), carbonMat);
    splitter.position.set(0, 0.14, 2.18);
    splitter.castShadow = true;
    this.root.add(splitter);
    this.lowerCarbonMeshes.push(splitter);

    // Front Splitter Winglets
    [-0.94, 0.94].forEach((x) => {
      const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.14, 0.22), carbonMat);
      winglet.position.set(x, 0.19, 2.22);
      this.root.add(winglet);
      this.lowerCarbonMeshes.push(winglet);
    });

    // Side Skirts
    [-1, 1].forEach((dir) => {
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 2.2), carbonMat);
      skirt.position.set(dir * 0.95, 0.14, 0.05);
      skirt.castShadow = true;
      this.root.add(skirt);
      this.lowerCarbonMeshes.push(skirt);
    });

    // Rear Race Diffuser with 4 Vertical Channels
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.2, 0.55), carbonMat);
    diffuser.position.set(0, 0.22, -2.12);
    diffuser.rotation.x = 0.22;
    diffuser.castShadow = true;
    this.root.add(diffuser);
    this.lowerCarbonMeshes.push(diffuser);

    [-0.52, -0.18, 0.18, 0.52].forEach((x) => {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.44), carbonMat);
      fin.position.set(x, 0.21, -2.15);
      fin.rotation.x = 0.22;
      this.root.add(fin);
      this.lowerCarbonMeshes.push(fin);
    });
  }

  /**
   * Scissor Doors (Left and Right)
   */
  private buildScissorDoors() {
    const doorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffcc00'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
    });

    // Left Scissor Door
    this.leftDoorGroup.position.set(-0.84, 0.45, 0.65); // Hinge
    const leftDoorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.38, 1.25), doorMat);
    leftDoorMesh.position.set(-0.06, 0, -0.6);
    leftDoorMesh.castShadow = true;
    this.leftDoorGroup.add(leftDoorMesh);
    this.bodyMeshes.push(leftDoorMesh);
    this.root.add(this.leftDoorGroup);

    // Right Scissor Door
    this.rightDoorGroup.position.set(0.84, 0.45, 0.65); // Hinge
    const rightDoorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.38, 1.25), doorMat);
    rightDoorMesh.position.set(0.06, 0, -0.6);
    rightDoorMesh.castShadow = true;
    this.rightDoorGroup.add(rightDoorMesh);
    this.bodyMeshes.push(rightDoorMesh);
    this.root.add(this.rightDoorGroup);
  }

  /**
   * Active Aero Dynamic Rear Wing Spoiler
   */
  private buildActiveSpoiler() {
    this.spoilerGroup.position.set(0, 0.64, -1.98);

    const wing = new THREE.Mesh(
      new THREE.BoxGeometry(1.82, 0.035, 0.32),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141416'),
        roughness: 0.25,
        metalness: 0.5,
        map: this.shinyCarbonTex,
      })
    );
    wing.castShadow = true;
    this.spoilerGroup.add(wing);
    this.lowerCarbonMeshes.push(wing);

    [-0.45, 0.45].forEach((x) => {
      const pylon = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.16, 0.1),
        new THREE.MeshStandardMaterial({ color: '#27292e', metalness: 0.8 })
      );
      pylon.position.set(x, -0.08, 0);
      this.spoilerGroup.add(pylon);
    });

    this.root.add(this.spoilerGroup);
  }

  /**
   * Iconic Y-Shaped Headlights & Full-Width Taillights
   */
  private buildYHeadlightsAndTaillights() {
    const drlMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#e0f2fe',
      emissiveIntensity: 0.4,
      roughness: 0.1,
    });

    // Front Y-DRLs
    [-1, 1].forEach((dir) => {
      const yGroup = new THREE.Group();

      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.025, 0.025), drlMat);
      upper.position.set(dir * 0.08, 0.05, 0);
      upper.rotation.z = dir * 0.45;

      const lower = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.025, 0.025), drlMat);
      lower.position.set(dir * 0.08, -0.05, 0);
      lower.rotation.z = dir * -0.45;

      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.025, 0.025), drlMat);
      stem.position.set(dir * -0.1, 0, 0);

      yGroup.add(upper);
      yGroup.add(lower);
      yGroup.add(stem);

      yGroup.position.set(dir * 0.68, 0.45, 2.08);
      yGroup.rotation.y = dir * -0.28;
      this.root.add(yGroup);
      this.lightEmissiveMeshes.push(upper, lower, stem);

      // Recessed LED Projector Headlamp
      const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.038, 0.038, 0.05, 6),
        new THREE.MeshStandardMaterial({
          color: '#0f172a',
          emissive: '#dbeafe',
          emissiveIntensity: 0.3,
        })
      );
      lamp.rotation.x = Math.PI / 2;
      lamp.position.set(dir * 0.62, 0.45, 2.04);
      this.root.add(lamp);
      this.lightEmissiveMeshes.push(lamp);
    });

    // Rear Sweeping Y-Taillights
    [-1, 1].forEach((dir) => {
      const tailMat = new THREE.MeshStandardMaterial({
        color: '#dc2626',
        emissive: '#ef4444',
        emissiveIntensity: 0.5,
        roughness: 0.1,
      });

      const tailGroup = new THREE.Group();
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.03), tailMat);
      t1.position.set(dir * 0.1, 0.04, 0);
      t1.rotation.z = dir * 0.32;

      const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.03), tailMat);
      t2.position.set(dir * 0.1, -0.04, 0);
      t2.rotation.z = dir * -0.32;

      const tStem = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.03), tailMat);
      tStem.position.set(dir * -0.14, 0, 0);

      tailGroup.add(t1);
      tailGroup.add(t2);
      tailGroup.add(tStem);

      tailGroup.position.set(dir * 0.62, 0.56, -2.08);
      tailGroup.rotation.y = dir * 0.18;
      this.root.add(tailGroup);
      this.tailLightMeshes.push(t1, t2, tStem);
    });
  }

  /**
   * 6.5L V12 Engine Bay
   */
  private buildV12EngineBay() {
    const bayGroup = new THREE.Group();
    bayGroup.position.set(0, 0.52, -1.05);

    const block = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.22, 0.84),
      new THREE.MeshStandardMaterial({ color: '#27292e', roughness: 0.4, metalness: 0.7 })
    );
    bayGroup.add(block);

    const runnerMat = new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.85, roughness: 0.25 });
    for (let i = 0; i < 6; i++) {
      const zOffset = -0.3 + i * 0.12;
      [-0.2, 0.2].forEach((x) => {
        const runner = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.11, 8), runnerMat);
        runner.position.set(x, 0.14, zOffset);
        runner.rotation.z = x > 0 ? 0.35 : -0.35;
        bayGroup.add(runner);
      });
    }

    const braceMat = new THREE.MeshStandardMaterial({ color: '#16171b', roughness: 0.3, metalness: 0.6 });
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.018, 0.95), braceMat);
    b1.position.y = 0.2;
    b1.rotation.y = 0.52;
    bayGroup.add(b1);

    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.018, 0.95), braceMat);
    b2.position.y = 0.2;
    b2.rotation.y = -0.52;
    bayGroup.add(b2);

    this.root.add(bayGroup);
  }

  /**
   * Cockpit Interior: Racing Bucket Seats, Steering Wheel
   */
  private buildCockpitInterior() {
    const cockpit = new THREE.Group();
    cockpit.position.set(0, 0.38, 0.15);

    const primaryLeather = new THREE.MeshStandardMaterial({ color: '#121316', roughness: 0.7 });
    const accentLeather = new THREE.MeshStandardMaterial({ color: '#ffcc00', roughness: 0.65 });

    [-0.32, 0.32].forEach((x) => {
      const seat = new THREE.Group();
      seat.position.set(x, 0, -0.18);

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.42), primaryLeather);
      seat.add(base);
      this.interiorLeatherMeshes.push(base);

      const back = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.48, 0.1), primaryLeather);
      back.position.set(0, 0.25, -0.18);
      back.rotation.x = -0.18;
      seat.add(back);
      this.interiorLeatherMeshes.push(back);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.02), accentLeather);
      stripe.position.set(0, 0.25, -0.12);
      stripe.rotation.x = -0.18;
      seat.add(stripe);
      this.interiorAccentMeshes.push(stripe);

      cockpit.add(seat);
    });

    const dash = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.18, 0.38),
      new THREE.MeshStandardMaterial({ color: '#181a1f', roughness: 0.6 })
    );
    dash.position.set(0, 0.28, 0.4);
    cockpit.add(dash);

    const display = new THREE.Mesh(
      new THREE.PlaneGeometry(0.24, 0.09),
      new THREE.MeshBasicMaterial({ color: '#eab308' })
    );
    display.position.set(-0.32, 0.36, 0.32);
    display.rotation.x = -0.25;
    cockpit.add(display);

    const steer = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.015, 8, 20),
      new THREE.MeshStandardMaterial({ color: '#16171b', roughness: 0.4 })
    );
    steer.position.set(-0.32, 0.3, 0.24);
    steer.rotation.x = 0.35;
    cockpit.add(steer);

    this.root.add(cockpit);
  }

  /**
   * Forged Wheels & Carbon Ceramic Brakes
   */
  private buildWheelsAndBrakes() {
    const wheelPositions = [
      { x: -0.92, y: 0.36, z: 1.4, isFront: true },
      { x: 0.92, y: 0.36, z: 1.4, isFront: true },
      { x: -0.95, y: 0.38, z: -1.35, isFront: false },
      { x: 0.95, y: 0.38, z: -1.35, isFront: false },
    ];

    const tireMat = new THREE.MeshStandardMaterial({ color: '#141416', roughness: 0.85, metalness: 0.1 });
    const rotorMat = new THREE.MeshStandardMaterial({ color: '#383a42', metalness: 0.9, roughness: 0.35 });
    const caliperMat = new THREE.MeshStandardMaterial({ color: '#ffcc00', metalness: 0.8, roughness: 0.25 });
    const rimMat = new THREE.MeshPhysicalMaterial({ color: '#141416', metalness: 0.92, roughness: 0.18, clearcoat: 0.8 });

    wheelPositions.forEach((pos) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(pos.x, pos.y, pos.z);

      const radius = pos.isFront ? 0.36 : 0.38;
      const width = pos.isFront ? 0.25 : 0.32;

      const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 24), tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wGroup.add(tire);

      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.72, radius * 0.72, 0.04, 18), rotorMat);
      rotor.rotation.z = Math.PI / 2;
      wGroup.add(rotor);

      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.09, radius * 0.45, 0.11), caliperMat);
      caliper.position.set(pos.x > 0 ? -0.05 : 0.05, radius * 0.42, 0);
      caliper.rotation.z = pos.x > 0 ? 0.25 : -0.25;
      wGroup.add(caliper);
      this.caliperMeshes.push(caliper);

      const rGroup = new THREE.Group();
      const outerRim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.82, 0.028, 8, 24), rimMat);
      outerRim.rotation.y = Math.PI / 2;
      rGroup.add(outerRim);

      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.03, radius * 0.75, 0.028), rimMat);
        spoke.position.set(pos.x > 0 ? 0.06 : -0.06, 0, 0);
        spoke.rotation.x = (s * 2 * Math.PI) / 5;
        rGroup.add(spoke);
      }

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 12), rimMat);
      hub.position.x = pos.x > 0 ? 0.08 : -0.08;
      hub.rotation.z = Math.PI / 2;
      rGroup.add(hub);

      wGroup.add(rGroup);
      this.rimMeshes.push(outerRim, hub);
      this.root.add(wGroup);
    });
  }

  /**
   * Elevated Twin Hexagonal Exhaust Outlets
   */
  private buildExhaustSystem() {
    const exhaustMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1f2024'),
      metalness: 0.95,
      roughness: 0.2,
    });

    [-0.14, 0.14].forEach((x) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.2, 6), exhaustMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(x, 0.58, -2.12);
      pipe.castShadow = true;
      this.root.add(pipe);
      this.exhaustMeshes.push(pipe);

      const inner = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.04, 6),
        new THREE.MeshBasicMaterial({ color: '#090a0c' })
      );
      inner.rotation.x = Math.PI / 2;
      inner.position.set(x, 0.58, -2.2);
      this.root.add(inner);
    });
  }

  public updateConfiguration(config: CarConfiguration) {
    const paintColor = new THREE.Color(config.exteriorColor.hex);
    this.bodyMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.color.copy(paintColor);
      mat.roughness = config.exteriorColor.roughness;
      mat.metalness = config.exteriorColor.metalness;
      mat.clearcoat = config.exteriorColor.clearcoat;
      mat.needsUpdate = true;
    });

    const isLowerShiny = config.carbonLower === 'shiny_carbon';
    const isLowerBody = config.carbonLower === 'body';

    this.lowerCarbonMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (isLowerBody) {
        mat.color.copy(paintColor);
        mat.map = null;
        mat.roughness = config.exteriorColor.roughness;
        mat.metalness = config.exteriorColor.metalness;
      } else {
        mat.color.set(isLowerShiny ? '#121215' : '#1c1d22');
        mat.map = isLowerShiny ? this.shinyCarbonTex : this.mattCarbonTex;
        mat.roughness = isLowerShiny ? 0.22 : 0.45;
        mat.metalness = isLowerShiny ? 0.65 : 0.4;
      }
      mat.needsUpdate = true;
    });

    const isUpperShiny = config.carbonUpper === 'shiny_carbon';
    const isUpperBody = config.carbonUpper === 'body';

    this.upperCarbonMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (isUpperBody) {
        mat.color.copy(paintColor);
        mat.roughness = config.exteriorColor.roughness;
        mat.metalness = config.exteriorColor.metalness;
      } else {
        mat.color.set(isUpperShiny ? '#121215' : '#1c1d22');
        mat.roughness = isUpperShiny ? 0.2 : 0.45;
        mat.metalness = isUpperShiny ? 0.7 : 0.35;
      }
      mat.needsUpdate = true;
    });

    const rimColor = new THREE.Color(config.rim.hex);
    this.rimMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.color.copy(rimColor);
      mat.metalness = config.rim.id.includes('diamond') ? 0.95 : 0.88;
      mat.roughness = config.rim.id.includes('matt') ? 0.45 : 0.18;
      mat.needsUpdate = true;
    });

    const caliperColor = new THREE.Color(config.caliper.hex);
    this.caliperMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.copy(caliperColor);
      mat.needsUpdate = true;
    });

    const exhaustColor = 
      config.exhaust === 'chrome' ? new THREE.Color('#d1d5db') :
      config.exhaust === 'titanium' ? new THREE.Color('#64748b') :
      new THREE.Color('#1c1d22');
    
    this.exhaustMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.copy(exhaustColor);
      mat.metalness = config.exhaust === 'matt_black' ? 0.6 : 0.96;
      mat.roughness = config.exhaust === 'matt_black' ? 0.48 : 0.15;
      mat.needsUpdate = true;
    });

    const primColor = new THREE.Color(config.interiorTrim.primaryLeatherHex);
    this.interiorLeatherMeshes.forEach((mesh) => {
      (mesh.material as THREE.MeshStandardMaterial).color.copy(primColor);
    });

    const accentColor = new THREE.Color(config.interiorTrim.secondaryLeatherHex);
    this.interiorAccentMeshes.forEach((mesh) => {
      (mesh.material as THREE.MeshStandardMaterial).color.copy(accentColor);
    });

    const emissiveIntensity = config.lightsOn ? 1.4 : 0.15;
    this.lightEmissiveMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = emissiveIntensity;
      mat.emissive.set(config.lightsOn ? '#bae6fd' : '#1e293b');
    });

    const tailEmissive = config.lightsOn ? 1.6 : 0.3;
    this.tailLightMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = tailEmissive;
    });

    this.targetDoorAngle = config.doorsOpen ? 1.15 : 0;

    if (config.spoilerPosition === 'retracted') {
      this.targetSpoilerHeight = 0;
      this.targetSpoilerPitch = 0;
    } else if (config.spoilerPosition === 'downforce') {
      this.targetSpoilerHeight = 0.12;
      this.targetSpoilerPitch = 0.2;
    } else {
      this.targetSpoilerHeight = 0.24;
      this.targetSpoilerPitch = 0.38;
    }
  }

  public animate(delta: number): boolean {
    let isMoving = false;

    if (Math.abs(this.currentDoorAngle - this.targetDoorAngle) > 0.001) {
      this.currentDoorAngle = THREE.MathUtils.damp(this.currentDoorAngle, this.targetDoorAngle, 7.0, delta);
      this.leftDoorGroup.rotation.set(-this.currentDoorAngle * 0.45, 0, -this.currentDoorAngle);
      this.rightDoorGroup.rotation.set(-this.currentDoorAngle * 0.45, 0, this.currentDoorAngle);
      isMoving = true;
    }

    if (
      Math.abs(this.currentSpoilerHeight - this.targetSpoilerHeight) > 0.001 ||
      Math.abs(this.currentSpoilerPitch - this.targetSpoilerPitch) > 0.001
    ) {
      this.currentSpoilerHeight = THREE.MathUtils.damp(this.currentSpoilerHeight, this.targetSpoilerHeight, 6.0, delta);
      this.currentSpoilerPitch = THREE.MathUtils.damp(this.currentSpoilerPitch, this.targetSpoilerPitch, 6.0, delta);
      
      this.spoilerGroup.position.y = 0.64 + this.currentSpoilerHeight;
      this.spoilerGroup.rotation.x = this.currentSpoilerPitch;
      isMoving = true;
    }

    return isMoving;
  }
}
