import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

// Node.js FileReader polyfill for GLTFExporter binary export
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const base64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
  };
}

// Ensure output directory exists
const outDir = path.resolve('public/models');
fs.mkdirSync(outDir, { recursive: true });
const glbPath = path.join(outDir, 'kairos-guardian.glb');

console.log('Building high-definition KAIROS 3D Guardian model...');

// Master scene
const scene = new THREE.Scene();

// PBR Materials
const obsidianArmorMat = new THREE.MeshStandardMaterial({
  color: 0x070B14,
  metalness: 0.94,
  roughness: 0.16,
  name: 'ObsidianArmor'
});

const brushedTitaniumMat = new THREE.MeshStandardMaterial({
  color: 0x141C2C,
  metalness: 0.95,
  roughness: 0.14,
  name: 'BrushedTitanium'
});

const carbonUndersuitMat = new THREE.MeshStandardMaterial({
  color: 0x04060B,
  metalness: 0.25,
  roughness: 0.85,
  name: 'CarbonUndersuit'
});

const cyanPlasmaMat = new THREE.MeshStandardMaterial({
  color: 0x00F0FF,
  emissive: 0x00F0FF,
  emissiveIntensity: 3.8,
  metalness: 0.1,
  roughness: 0.1,
  name: 'CyanPlasma'
});

const rockMat = new THREE.MeshStandardMaterial({
  color: 0x0F1520,
  metalness: 0.15,
  roughness: 0.88,
  flatShading: true,
  name: 'PromontoryRock'
});

const capeMat = new THREE.MeshStandardMaterial({
  color: 0x040813,
  roughness: 0.65,
  metalness: 0.2,
  side: THREE.DoubleSide,
  name: 'GuardianCape'
});

// Master Guardian Group
const guardian = new THREE.Group();
guardian.name = 'KAIROS_Guardian';
scene.add(guardian);

// ==========================================
// 1. PROMONTORY CLIFF BASE
// ==========================================
const baseGroup = new THREE.Group();
baseGroup.name = 'PromontoryBase';
baseGroup.position.set(0, -0.45, 0);
guardian.add(baseGroup);

const mainRock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.7, 2), rockMat);
mainRock.scale.set(1.45, 0.45, 1.25);
mainRock.position.y = -0.22;
baseGroup.add(mainRock);

const cragL = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), rockMat);
cragL.scale.set(1.2, 0.5, 0.9);
cragL.position.set(0.75, -0.12, 0.45);
baseGroup.add(cragL);

const cragR = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 1), rockMat);
cragR.scale.set(1.15, 0.45, 0.85);
cragR.position.set(-0.78, -0.15, 0.35);
baseGroup.add(cragR);

const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.016, 8, 48), cyanPlasmaMat);
baseRing.rotation.x = Math.PI / 2;
baseRing.position.y = -0.04;
baseGroup.add(baseRing);

// ==========================================
// 2. TORSO & CHEST
// ==========================================
const torsoGroup = new THREE.Group();
torsoGroup.name = 'Torso';
guardian.add(torsoGroup);

// Muscular Core Undersuit
const coreUndersuit = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.28, 0.96, 16),
  carbonUndersuitMat
);
coreUndersuit.position.y = 1.48;
torsoGroup.add(coreUndersuit);

// Chiseled Pectoral Plates (Left & Right)
const pecL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.36), obsidianArmorMat);
pecL.position.set(-0.175, 1.7, 0.12);
pecL.rotation.y = 0.15;
pecL.rotation.z = -0.05;
torsoGroup.add(pecL);

const pecR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.36), obsidianArmorMat);
pecR.position.set(0.175, 1.7, 0.12);
pecR.rotation.y = -0.15;
pecR.rotation.z = 0.05;
torsoGroup.add(pecR);

// Pectoral Energy Inset Channels
const pecGlowL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.02, 0.37), cyanPlasmaMat);
pecGlowL.position.set(-0.165, 1.6, 0.13);
pecGlowL.rotation.y = 0.15;
torsoGroup.add(pecGlowL);

const pecGlowR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.02, 0.37), cyanPlasmaMat);
pecGlowR.position.set(0.165, 1.6, 0.13);
pecGlowR.rotation.y = -0.15;
torsoGroup.add(pecGlowR);

// Stylized KAIROS Chevron Sternum Emblem
const emblemBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.16, 0.16, 0.045, 24),
  brushedTitaniumMat
);
emblemBase.rotation.x = Math.PI / 2;
emblemBase.position.set(0, 1.68, 0.28);
torsoGroup.add(emblemBase);

const chevronWingL = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.038, 0.055), cyanPlasmaMat);
chevronWingL.rotation.z = 0.55;
chevronWingL.position.set(-0.068, 1.7, 0.31);
torsoGroup.add(chevronWingL);

const chevronWingR = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.038, 0.055), cyanPlasmaMat);
chevronWingR.rotation.z = -0.55;
chevronWingR.position.set(0.068, 1.7, 0.31);
torsoGroup.add(chevronWingR);

const emblemCore = new THREE.Mesh(new THREE.SphereGeometry(0.058, 16, 16), cyanPlasmaMat);
emblemCore.position.set(0, 1.68, 0.31);
torsoGroup.add(emblemCore);

// 4-Tier Abdominal Plates with Luminescent Seams
for (let i = 0; i < 4; i++) {
  const y = 1.36 - i * 0.095;
  const w = 0.45 - i * 0.042;
  const plate = new THREE.Mesh(new THREE.BoxGeometry(w, 0.076, 0.31), obsidianArmorMat);
  plate.position.set(0, y, 0.08);
  torsoGroup.add(plate);

  const seam = new THREE.Mesh(new THREE.BoxGeometry(w * 0.84, 0.016, 0.315), cyanPlasmaMat);
  seam.position.set(0, y, 0.085);
  torsoGroup.add(seam);
}

// Latissimus / Rib Armor Plates
const ribL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.38, 0.28), obsidianArmorMat);
ribL.position.set(-0.28, 1.45, 0.02);
ribL.rotation.z = 0.12;
torsoGroup.add(ribL);

const ribR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.38, 0.28), obsidianArmorMat);
ribR.position.set(0.28, 1.45, 0.02);
ribR.rotation.z = -0.12;
torsoGroup.add(ribR);

// Spinal Column Armor Plating (Rear)
for (let i = 0; i < 5; i++) {
  const spinePlate = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.065, 0.08), brushedTitaniumMat);
  spinePlate.position.set(0, 1.72 - i * 0.11, -0.26);
  torsoGroup.add(spinePlate);

  const spineGlow = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.05, 0.09), cyanPlasmaMat);
  spineGlow.position.set(0, 1.72 - i * 0.11, -0.265);
  torsoGroup.add(spineGlow);
}

// ==========================================
// 3. SCULPTED HELMET & COWL
// ==========================================
const headGroup = new THREE.Group();
headGroup.name = 'Head_Helmet';
headGroup.position.set(0, 2.18, 0.02);
guardian.add(headGroup);

// Neck Collar / Gorget
const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.22, 16), brushedTitaniumMat);
neck.position.set(0, -0.18, 0);
headGroup.add(neck);

// Cranial Shell
const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 20), obsidianArmorMat);
headGroup.add(cranium);

// Angular Cheek Cowls
const cheekL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.19, 0.18), brushedTitaniumMat);
cheekL.position.set(-0.165, -0.1, 0.12);
cheekL.rotation.y = 0.28;
headGroup.add(cheekL);

const cheekR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.19, 0.18), brushedTitaniumMat);
cheekR.position.set(0.165, -0.1, 0.12);
cheekR.rotation.y = -0.28;
headGroup.add(cheekR);

// Chin / Jaw Guard
const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.18), obsidianArmorMat);
jaw.position.set(0, -0.16, 0.15);
headGroup.add(jaw);

// Swept-Back Sentinel Crown Horns
const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.058, 0.4, 5), brushedTitaniumMat);
hornL.rotation.z = -0.32;
hornL.rotation.x = -0.26;
hornL.position.set(-0.14, 0.27, -0.06);
headGroup.add(hornL);

const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.058, 0.4, 5), brushedTitaniumMat);
hornR.rotation.z = 0.32;
hornR.rotation.x = -0.26;
hornR.position.set(0.14, 0.27, -0.06);
headGroup.add(hornR);

// Horn Plasma Highlights
const hornGlowL = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.32, 0.02), cyanPlasmaMat);
hornGlowL.rotation.z = -0.32;
hornGlowL.rotation.x = -0.26;
hornGlowL.position.set(-0.15, 0.25, -0.05);
headGroup.add(hornGlowL);

const hornGlowR = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.32, 0.02), cyanPlasmaMat);
hornGlowR.rotation.z = 0.32;
hornGlowR.rotation.x = -0.26;
hornGlowR.position.set(0.15, 0.25, -0.05);
headGroup.add(hornGlowR);

// Electric Cyan Slit Visor
const visor = new THREE.Mesh(
  new THREE.CylinderGeometry(0.25, 0.23, 0.09, 24, 1, false, 0, Math.PI),
  cyanPlasmaMat
);
visor.rotation.y = Math.PI / 2;
visor.position.set(0, 0, 0.075);
headGroup.add(visor);

// Brow Ridge
const brow = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.045, 0.17), obsidianArmorMat);
brow.position.set(0, 0.075, 0.13);
headGroup.add(brow);

// ==========================================
// 4. SHOULDERS & GAUNTLETED ARMS
// ==========================================
const buildArm = (isLeft) => {
  const arm = new THREE.Group();
  arm.name = isLeft ? 'Arm_Left' : 'Arm_Right';
  const side = isLeft ? -1 : 1;
  arm.position.set(side * 0.55, 1.78, 0);

  // Multi-Tiered Shoulder Pauldron
  const pauldron = new THREE.Mesh(new THREE.ConeGeometry(0.29, 0.39, 6), obsidianArmorMat);
  pauldron.rotation.z = side * (Math.PI / 4.2);
  pauldron.position.set(0, 0.09, 0);
  arm.add(pauldron);

  const pauldronGlow = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.018, 8, 24),
    cyanPlasmaMat
  );
  pauldronGlow.rotation.x = Math.PI / 2;
  pauldronGlow.position.set(0, -0.02, 0);
  arm.add(pauldronGlow);

  // Bicep
  const bicep = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.115, 0.45, 12), carbonUndersuitMat);
  bicep.position.set(side * 0.05, -0.27, 0);
  arm.add(bicep);

  const bicepPlate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.14), obsidianArmorMat);
  bicepPlate.position.set(side * 0.15, -0.27, 0.02);
  arm.add(bicepPlate);

  const bicepGlow = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.35, 0.135), cyanPlasmaMat);
  bicepGlow.position.set(side * 0.18, -0.27, 0.02);
  arm.add(bicepGlow);

  // Elbow Guard
  const elbow = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.1), brushedTitaniumMat);
  elbow.position.set(side * 0.06, -0.48, -0.06);
  arm.add(elbow);

  // Armored Gauntlet
  const gauntlet = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.52, 0.23), obsidianArmorMat);
  gauntlet.position.set(side * 0.08, -0.7, 0.06);
  arm.add(gauntlet);

  // Forearm Energy Blade
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.46, 0.075), cyanPlasmaMat);
  blade.position.set(side * 0.2, -0.7, 0.095);
  arm.add(blade);

  // Armored Fist
  const fist = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.17, 0.18), brushedTitaniumMat);
  fist.position.set(side * 0.08, -1.0, 0.095);
  arm.add(fist);

  // Knuckle Guard
  const knuckles = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.06), cyanPlasmaMat);
  knuckles.position.set(side * 0.08, -0.96, 0.18);
  arm.add(knuckles);

  return arm;
};

guardian.add(buildArm(true));
guardian.add(buildArm(false));

// ==========================================
// 5. BELT & PELVIS
// ==========================================
const beltGroup = new THREE.Group();
beltGroup.name = 'Belt_Pelvis';
guardian.add(beltGroup);

const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.17, 16), obsidianArmorMat);
belt.position.set(0, 0.98, 0);
beltGroup.add(belt);

const beltBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.4), cyanPlasmaMat);
beltBuckle.position.set(0, 0.98, 0.02);
beltGroup.add(beltBuckle);

// Hip Pouches
const pouchL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.14), brushedTitaniumMat);
pouchL.position.set(-0.35, 0.98, 0.05);
beltGroup.add(pouchL);

const pouchR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.14), brushedTitaniumMat);
pouchR.position.set(0.35, 0.98, 0.05);
beltGroup.add(pouchR);

// ==========================================
// 6. ARMORED LEGS & HEAVY BOOTS
// ==========================================
const buildLeg = (isLeft) => {
  const leg = new THREE.Group();
  leg.name = isLeft ? 'Leg_Left' : 'Leg_Right';
  const side = isLeft ? -1 : 1;
  leg.position.set(side * 0.23, 0.9, 0);

  // Thigh
  const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.135, 0.59, 12), carbonUndersuitMat);
  thigh.position.set(0, -0.28, 0);
  leg.add(thigh);

  const thighArmor = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.46, 0.24), obsidianArmorMat);
  thighArmor.position.set(side * 0.135, -0.28, 0.02);
  leg.add(thighArmor);

  const thighGlow = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.4, 0.25), cyanPlasmaMat);
  thighGlow.position.set(side * 0.175, -0.28, 0.02);
  leg.add(thighGlow);

  // Hydraulic Knee Joint
  const knee = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.16), brushedTitaniumMat);
  knee.position.set(0, -0.59, 0.1);
  leg.add(knee);

  const kneeGlow = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.17), cyanPlasmaMat);
  kneeGlow.position.set(0, -0.59, 0.1);
  leg.add(kneeGlow);

  // Shin Greave
  const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.115, 0.58, 10), obsidianArmorMat);
  shin.position.set(0, -0.93, 0);
  leg.add(shin);

  const shinBevel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.08), brushedTitaniumMat);
  shinBevel.position.set(0, -0.93, 0.12);
  leg.add(shinBevel);

  // Armored Boot
  const boot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.22, 0.39), obsidianArmorMat);
  boot.position.set(0, -1.23, 0.08);
  leg.add(boot);

  const soleGlow = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.025, 0.35), cyanPlasmaMat);
  soleGlow.position.set(0, -1.33, 0.08);
  leg.add(soleGlow);

  return leg;
};

guardian.add(buildLeg(true));
guardian.add(buildLeg(false));

// ==========================================
// 7. MIDNIGHT NAVY TEXTURED CAPE
// ==========================================
const cape = new THREE.Mesh(
  new THREE.PlaneGeometry(1.28, 2.3, 16, 24),
  capeMat
);
cape.name = 'GuardianCapeMesh';
cape.rotation.x = 0.25;
cape.position.set(0.08, 0.88, -0.4);
guardian.add(cape);

console.log('Exporting KAIROS Guardian to GLB binary...');

const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltfBinary) => {
    fs.writeFileSync(glbPath, Buffer.from(gltfBinary));
    const stats = fs.statSync(glbPath);
    console.log(`Successfully generated ${glbPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  },
  (err) => {
    console.error('Failed to export GLTF/GLB:', err);
    process.exit(1);
  },
  { binary: true }
);
