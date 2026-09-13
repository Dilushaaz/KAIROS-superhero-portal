import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';

export default function Kairos3DGuardian() {
  const containerRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Deep Cinematic Atmospheric Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070D, 0.042);

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. 5-Point Studio Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x091224, 2.0);
    scene.add(ambientLight);

    // Key Light: Cool Cyan from top-front-right
    const keyLight = new THREE.DirectionalLight(0x00F0FF, 3.8);
    keyLight.position.set(4.0, 5.5, 4.5);
    scene.add(keyLight);

    // Rim Light: Intense Royal Violet from back-left for razor silhouette separation
    const rimLight = new THREE.DirectionalLight(0x8A2BE2, 4.6);
    rimLight.position.set(-4.5, 3.5, -4.0);
    scene.add(rimLight);

    // Fill Light: Soft deep indigo from low-left
    const fillLight = new THREE.DirectionalLight(0x1B2A4A, 2.2);
    fillLight.position.set(-3.0, 1.0, 3.0);
    scene.add(fillLight);

    // Chest Emblem Core Point Light
    const emblemLight = new THREE.PointLight(0x00F0FF, 3.2, 4.0);
    emblemLight.position.set(0, 1.62, 0.65);
    scene.add(emblemLight);

    // Upward Rock Promontory Bounce Light
    const rockBounceLight = new THREE.PointLight(0x00F0FF, 1.6, 3.2);
    rockBounceLight.position.set(0, -0.4, 0.8);
    scene.add(rockBounceLight);

    // 3. Materials
    const obsidianArmorMat = new THREE.MeshStandardMaterial({
      color: 0x0C101A,
      metalness: 0.9,
      roughness: 0.22,
      envMapIntensity: 1.2
    });

    const brushedTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1A2232,
      metalness: 0.94,
      roughness: 0.16
    });

    const carbonUndersuitMat = new THREE.MeshStandardMaterial({
      color: 0x06080E,
      metalness: 0.2,
      roughness: 0.8
    });

    const cyanPlasmaMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      emissive: 0x00F0FF,
      emissiveIntensity: 3.2,
      metalness: 0.1,
      roughness: 0.1
    });

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      metalness: 0.15,
      roughness: 0.88,
      flatShading: true
    });

    // 4. Master Character & Environment Stage Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // --- A. Rugged Rocky Cliff Promontory ---
    const rockCragGroup = new THREE.Group();
    rockCragGroup.position.set(0, -0.45, 0);
    stageGroup.add(rockCragGroup);

    // Base rock mass
    const mainRockGeo = new THREE.DodecahedronGeometry(1.65, 1);
    const mainRock = new THREE.Mesh(mainRockGeo, rockMat);
    mainRock.scale.set(1.4, 0.45, 1.2);
    mainRock.position.y = -0.25;
    rockCragGroup.add(mainRock);

    // Secondary stepped rocky crags
    const crag1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 1), rockMat);
    crag1.scale.set(1.2, 0.5, 0.9);
    crag1.position.set(0.7, -0.15, 0.4);
    rockCragGroup.add(crag1);

    const crag2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75, 1), rockMat);
    crag2.scale.set(1.1, 0.45, 0.8);
    crag2.position.set(-0.75, -0.18, 0.3);
    rockCragGroup.add(crag2);

    // Subtle blue edge illumination line across rock rim
    const rockRimGlow = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.015, 8, 32),
      cyanPlasmaMat
    );
    rockRimGlow.rotation.x = Math.PI / 2;
    rockRimGlow.position.y = -0.04;
    rockCragGroup.add(rockRimGlow);

    // --- B. The KAIROS Guardian Anatomy ---
    const guardianGroup = new THREE.Group();
    guardianGroup.position.set(0, 0, 0);
    stageGroup.add(guardianGroup);

    // 1. Muscular Torso & Segmented Armor
    // Undersuit
    const torsoCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.26, 0.92, 12),
      carbonUndersuitMat
    );
    torsoCore.position.y = 1.46;
    guardianGroup.add(torsoCore);

    // Sculpted Pectoral Armor Plates
    const pecL = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.4, 0.34),
      obsidianArmorMat
    );
    pecL.position.set(-0.17, 1.68, 0.1);
    pecL.rotation.y = 0.12;
    pecL.rotation.z = -0.05;
    guardianGroup.add(pecL);

    const pecR = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.4, 0.34),
      obsidianArmorMat
    );
    pecR.position.set(0.17, 1.68, 0.1);
    pecR.rotation.y = -0.12;
    pecR.rotation.z = 0.05;
    guardianGroup.add(pecR);

    // Luminescent Energy Channels along Pectorals
    const pecGlowL = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.018, 0.35),
      cyanPlasmaMat
    );
    pecGlowL.position.set(-0.16, 1.58, 0.11);
    pecGlowL.rotation.y = 0.12;
    guardianGroup.add(pecGlowL);

    const pecGlowR = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.018, 0.35),
      cyanPlasmaMat
    );
    pecGlowR.position.set(0.16, 1.58, 0.11);
    pecGlowR.rotation.y = -0.12;
    guardianGroup.add(pecGlowR);

    // Central KAIROS Triangular / Circular Moment Core
    const emblemBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.04, 24),
      brushedTitaniumMat
    );
    emblemBase.rotation.x = Math.PI / 2;
    emblemBase.position.set(0, 1.66, 0.26);
    guardianGroup.add(emblemBase);

    const emblemRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.02, 16, 32),
      cyanPlasmaMat
    );
    emblemRing.position.set(0, 1.66, 0.28);
    guardianGroup.add(emblemRing);

    const emblemCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 16),
      cyanPlasmaMat
    );
    emblemCore.position.set(0, 1.66, 0.28);
    guardianGroup.add(emblemCore);

    // Abdominal Ballistic Flex-Plates (4 Segmented Tiers)
    for (let i = 0; i < 4; i++) {
      const y = 1.35 - i * 0.095;
      const w = 0.44 - i * 0.04;
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.075, 0.3),
        obsidianArmorMat
      );
      plate.position.set(0, y, 0.07);
      guardianGroup.add(plate);

      const seam = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.8, 0.014, 0.305),
        cyanPlasmaMat
      );
      seam.position.set(0, y, 0.075);
      guardianGroup.add(seam);
    }

    // 2. Sculpted Helmet, Cowl & Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.16, 0.02);
    guardianGroup.add(headGroup);

    // Cranial Dome
    const cranium = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 24, 20),
      obsidianArmorMat
    );
    headGroup.add(cranium);

    // Beveled Faceplates & Cheek Vents
    const cheekL = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.18, 0.16),
      brushedTitaniumMat
    );
    cheekL.position.set(-0.16, -0.1, 0.1);
    cheekL.rotation.y = 0.25;
    headGroup.add(cheekL);

    const cheekR = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.18, 0.16),
      brushedTitaniumMat
    );
    cheekR.position.set(0.16, -0.1, 0.1);
    cheekR.rotation.y = -0.25;
    headGroup.add(cheekR);

    // Glowing Cyan Visor Slit
    const visor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.22, 0.1, 20, 1, false, 0, Math.PI),
      cyanPlasmaMat
    );
    visor.rotation.y = Math.PI / 2;
    visor.position.set(0, 0, 0.065);
    headGroup.add(visor);

    // Aerodynamic Crest Fin
    const crest = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.4, 4),
      brushedTitaniumMat
    );
    crest.rotation.x = Math.PI / 3.6;
    crest.position.set(0, 0.22, -0.07);
    headGroup.add(crest);

    // 3. Shoulders & Muscular Arms with Plasma Veins
    const buildHeroArm = (isLeft) => {
      const armGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;
      armGroup.position.set(side * 0.52, 1.76, 0);

      // Broad Tiered Shoulder Pauldron
      const pauldron = new THREE.Mesh(
        new THREE.ConeGeometry(0.26, 0.36, 6),
        obsidianArmorMat
      );
      pauldron.rotation.z = side * (Math.PI / 4.4);
      pauldron.position.set(0, 0.08, 0);
      armGroup.add(pauldron);

      // Pauldron Cyan Edge Glow
      const pauldronGlow = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.016, 8, 20),
        cyanPlasmaMat
      );
      pauldronGlow.rotation.x = Math.PI / 2;
      pauldronGlow.position.set(0, -0.02, 0);
      armGroup.add(pauldronGlow);

      // Muscular Bicep
      const bicep = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.1, 0.42, 10),
        carbonUndersuitMat
      );
      bicep.position.set(side * 0.05, -0.26, 0);
      armGroup.add(bicep);

      // Bicep Plasma Line
      const bicepGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.34, 0.12),
        cyanPlasmaMat
      );
      bicepGlow.position.set(side * 0.15, -0.26, 0.02);
      armGroup.add(bicepGlow);

      // Armored Gauntlet
      const gauntlet = new THREE.Mesh(
        new THREE.BoxGeometry(0.17, 0.48, 0.2),
        obsidianArmorMat
      );
      gauntlet.position.set(side * 0.08, -0.66, 0.06);
      armGroup.add(gauntlet);

      // Outer Forearm Plasma Blade Strip
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.42, 0.06),
        cyanPlasmaMat
      );
      blade.position.set(side * 0.18, -0.66, 0.08);
      armGroup.add(blade);

      // Armored Fist with Knuckle Guard
      const fist = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.16, 0.16),
        brushedTitaniumMat
      );
      fist.position.set(side * 0.08, -0.96, 0.08);
      armGroup.add(fist);

      return armGroup;
    };

    const armLeft = buildHeroArm(true);
    const armRight = buildHeroArm(false);
    guardianGroup.add(armLeft);
    guardianGroup.add(armRight);

    // 4. Armored Belt
    const belt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.36, 0.16, 16),
      obsidianArmorMat
    );
    belt.position.set(0, 0.98, 0);
    guardianGroup.add(belt);

    const beltBuckle = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.1, 0.38),
      cyanPlasmaMat
    );
    beltBuckle.position.set(0, 0.98, 0.02);
    guardianGroup.add(beltBuckle);

    // 5. Powerful Thighs, Hydraulic Knees & Heavy Boots
    const buildHeroLeg = (isLeft) => {
      const legGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;
      legGroup.position.set(side * 0.22, 0.9, 0);

      // Muscular Thigh
      const thigh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.12, 0.56, 10),
        carbonUndersuitMat
      );
      thigh.position.set(0, -0.28, 0);
      legGroup.add(thigh);

      // Lateral Thigh Armor Shell
      const thighArmor = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.44, 0.22),
        obsidianArmorMat
      );
      thighArmor.position.set(side * 0.12, -0.28, 0.02);
      legGroup.add(thighArmor);

      // Glowing Plasma Line along Thigh
      const thighGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.016, 0.38, 0.23),
        cyanPlasmaMat
      );
      thighGlow.position.set(side * 0.16, -0.28, 0.02);
      legGroup.add(thighGlow);

      // Hydraulic Knee Plate
      const knee = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.18, 0.14),
        brushedTitaniumMat
      );
      knee.position.set(0, -0.58, 0.1);
      legGroup.add(knee);

      const kneeGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.06, 0.15),
        cyanPlasmaMat
      );
      kneeGlow.position.set(0, -0.58, 0.1);
      legGroup.add(kneeGlow);

      // Shin Greave
      const shin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.1, 0.54, 8),
        obsidianArmorMat
      );
      shin.position.set(0, -0.9, 0);
      legGroup.add(shin);

      // Shin Front Bevel Plate
      const shinBevel = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.44, 0.07),
        brushedTitaniumMat
      );
      shinBevel.position.set(0, -0.9, 0.11);
      legGroup.add(shinBevel);

      // Heavy Armored Boot
      const boot = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.2, 0.36),
        obsidianArmorMat
      );
      boot.position.set(0, -1.2, 0.08);
      legGroup.add(boot);

      // Glowing Sole Line
      const soleGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.17, 0.02, 0.32),
        cyanPlasmaMat
      );
      soleGlow.position.set(0, -1.3, 0.08);
      legGroup.add(soleGlow);

      return legGroup;
    };

    const legLeft = buildHeroLeg(true);
    const legRight = buildHeroLeg(false);
    guardianGroup.add(legLeft);
    guardianGroup.add(legRight);

    // 6. Magnificent Billowing Dark Navy Cape with Procedural Wind Dynamics
    const capeGroup = new THREE.Group();
    capeGroup.position.set(0, 1.82, -0.18);
    guardianGroup.add(capeGroup);

    // Cape material with subtle translucency and rich velvet/mesh shading
    const capeMat = new THREE.MeshPhysicalMaterial({
      color: 0x050811,
      emissive: 0x0a1628,
      emissiveIntensity: 0.5,
      metalness: 0.2,
      roughness: 0.6,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    const capeWidthSegments = 16;
    const capeHeightSegments = 24;
    const capeGeo = new THREE.PlaneGeometry(1.2, 2.2, capeWidthSegments, capeHeightSegments);
    const capeMesh = new THREE.Mesh(capeGeo, capeMat);
    capeMesh.rotation.x = 0.28;
    capeMesh.position.set(0.12, -0.95, -0.2); // Slightly offset over right shoulder like the reference
    capeGroup.add(capeMesh);

    // 7. Ambient Glowing Cyber Embers rising from the city below
    const emberCount = 160;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 6.0;
      emberPositions[i * 3 + 1] = Math.random() * 4.6;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 6.0;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // 5. 360° Drag & Smooth Inertia Interaction Physics
    let isUserDragging = false;
    let previousPointerX = 0;
    let rotationVelocity = 0;
    const friction = 0.93;

    const onPointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      setHasInteracted(true);
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      previousPointerX = clientX;
    };

    const onPointerMove = (e) => {
      if (!isUserDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - previousPointerX;
      previousPointerX = clientX;

      stageGroup.rotation.y += deltaX * 0.011;
      rotationVelocity = deltaX * 0.011;
    };

    const onPointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. Cinematic Hero Reveal / Emergence Sequence
    stageGroup.position.y = -0.55;
    stageGroup.scale.set(0.88, 0.88, 0.88);

    let revealProgress = 0;
    const revealDuration = 1.6;

    // 7. Render & Animation Loop (60 FPS)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Cinematic Reveal Lerp
      if (revealProgress < 1.0) {
        revealProgress = Math.min(1.0, revealProgress + delta / revealDuration);
        const ease = 1 - Math.pow(1 - revealProgress, 3);
        stageGroup.position.y = -0.55 + ease * 0.55;
        const scaleVal = 0.88 + ease * 0.12;
        stageGroup.scale.set(scaleVal, scaleVal, scaleVal);

        if (revealProgress >= 1.0) {
          setIsRevealed(true);
        }
      }

      // Drag inertia
      if (!isUserDragging) {
        stageGroup.rotation.y += rotationVelocity;
        rotationVelocity *= friction;
        if (Math.abs(rotationVelocity) < 0.0008) {
          rotationVelocity = 0;
        }
      }

      // Breathing & subtle heroic posture oscillation
      const breath = Math.sin(elapsedTime * 1.4) * 0.032;
      guardianGroup.position.y = breath;

      // Dynamic Cape Wind Simulation (Ocean / Cliff Wind)
      const posAttr = capeGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = (i % (capeWidthSegments + 1)) / capeWidthSegments;
        const v = Math.floor(i / (capeWidthSegments + 1)) / capeHeightSegments;
        // Vertices near the top stay anchored; lower vertices flutter dramatically
        const windWave = Math.sin(elapsedTime * 2.8 + v * 3.5 + u * 2.0) * (v * 0.14);
        const windSway = Math.cos(elapsedTime * 2.2 + v * 2.8) * (v * 0.08);
        posAttr.setZ(i, windWave);
        posAttr.setX(i, (u - 0.5) * 1.2 + windSway);
      }
      posAttr.needsUpdate = true;

      // Pulse on Emblem & Visor
      const corePulse = 2.6 + Math.sin(elapsedTime * 2.8) * 0.9;
      emblemLight.intensity = corePulse;
      emblemCore.material.emissiveIntensity = corePulse;
      visor.material.emissiveIntensity = 2.6 + Math.sin(elapsedTime * 2.2) * 0.6;

      // Cyber Embers rising from the city below
      const emberArr = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        emberArr[i * 3 + 1] += 0.01;
        if (emberArr[i * 3 + 1] > 4.6) {
          emberArr[i * 3 + 1] = 0;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Viewport Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 540;
      const newH = container.clientHeight || 640;

      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 9. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`guardian-3d-wrapper ${isRevealed ? 'system-active' : ''}`} role="region" aria-label="Interactive 3D KAIROS Superhero Model">
      {/* 360° Drag Hint */}
      <div className={`guardian-drag-hint ${hasInteracted ? 'fade-out' : ''}`}>
        <RotateCcw size={14} className="hint-icon-spin" aria-hidden="true" />
        <span>DRAG TO INSPECT • 360°</span>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className={`guardian-canvas-container ${isDragging ? 'is-dragging' : ''}`}
      />

      {/* Floating Cinematic Badges & Directives matching reference */}
      <div className="guardian-cinematic-overlay">
        <div className="guardian-lore-quote">
          <span>“A SAFER TOMORROW TOGETHER.”</span>
        </div>

        <div className="guardian-directive-badge">
          <span className="directive-header">KAIROS</span>
          <span className="directive-item">PROTECTS</span>
          <span className="directive-item">LISTENS</span>
          <span className="directive-item">EMPOWERS</span>
          <span className="directive-item">ACTS</span>
        </div>

        <div className="guardian-rock-caption">
          <span>PEOPLE TODAY. A BRIGHTER TOMORROW.</span>
        </div>
      </div>
    </div>
  );
}
