import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCcw } from 'lucide-react';

export default function Kairos3DGuardian() {
  const containerRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Cinematic Atmospheric Deep Blue Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040711, 0.035);

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 680;

    // Camera framed heroically for full body and pedestal
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.0);
    camera.lookAt(0, 0.12, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. High-Fidelity Studio Environment Lighting (RoomEnvironment IBL)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envTexture;
    if ('environmentIntensity' in scene) {
      scene.environmentIntensity = 0.65;
    }

    // 3. Cinematic 5-Point Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x081020, 2.0);
    scene.add(ambientLight);

    // Key Light: Cool Electric Cyan with optimized shadow frustum
    const keyLight = new THREE.DirectionalLight(0x00F0FF, 3.8);
    keyLight.position.set(3.5, 5.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15.0;
    keyLight.shadow.camera.left = -1.8;
    keyLight.shadow.camera.right = 1.8;
    keyLight.shadow.camera.top = 2.2;
    keyLight.shadow.camera.bottom = -1.6;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim Light: Razor Electric Blue from rear-left
    const rimLight = new THREE.DirectionalLight(0x1A6CFF, 5.2);
    rimLight.position.set(-4.5, 3.5, -4.0);
    scene.add(rimLight);

    // Secondary Back Rim: Cool Indigo
    const backRim = new THREE.DirectionalLight(0x4A8CFF, 3.2);
    backRim.position.set(3.2, 2.2, -3.5);
    scene.add(backRim);

    // Fill Light: Soft deep navy
    const fillLight = new THREE.DirectionalLight(0x101C30, 2.2);
    fillLight.position.set(-3.0, 1.0, 3.0);
    scene.add(fillLight);

    // 4. Master Stage Group
    const stageGroup = new THREE.Group();
    stageGroup.position.y = -0.3;
    stageGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(stageGroup);

    // Cybernetic Pedestal Base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -0.94, 0);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.25, 0.08, 36),
      new THREE.MeshStandardMaterial({
        color: 0x070D18,
        metalness: 0.9,
        roughness: 0.25
      })
    );
    platform.position.y = -0.04;
    platform.receiveShadow = true;
    pedestalGroup.add(platform);

    const baseRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.16, 0.012, 12, 64),
      new THREE.MeshStandardMaterial({
        color: 0x00F0FF,
        emissive: 0x00F0FF,
        emissiveIntensity: 2.6,
        roughness: 0.2
      })
    );
    baseRing.rotation.x = Math.PI / 2;
    pedestalGroup.add(baseRing);

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.008, 8, 48),
      new THREE.MeshStandardMaterial({
        color: 0x1A6CFF,
        emissive: 0x1A6CFF,
        emissiveIntensity: 2.0,
        roughness: 0.3
      })
    );
    innerRing.rotation.x = Math.PI / 2;
    pedestalGroup.add(innerRing);

    const discDecal = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.82, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide
      })
    );
    discDecal.rotation.x = -Math.PI / 2;
    discDecal.position.y = 0.002;
    pedestalGroup.add(discDecal);

    stageGroup.add(pedestalGroup);

    // Background Cybernetic Halo
    const haloRing = new THREE.Mesh(
      new THREE.RingGeometry(1.85, 1.9, 64),
      new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      })
    );
    haloRing.position.set(0, 0.2, -1.2);
    scene.add(haloRing);

    // Dynamic animation & material trackers
    let mixer = null;
    let isModelReady = false;
    const plasmaMaterials = [];

    // 5. Load Upgraded KAIROS 3D Guardian Model
    const loader = new GLTFLoader();
    const modelUrl = '/models/kairos-xbot-test.glb';
    const fallbackUrl = '/models/kairos-guardian.glb';

    const loadGLB = (url, isFallback = false) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.name = 'KAIROS_3D_Model';
          model.position.set(0, -0.94, 0);
          model.scale.set(1.18, 1.18, 1.18);

          // KAIROS PBR Obsidian Armor & Carbon Undersuit
          const obsidianArmorMat = new THREE.MeshStandardMaterial({
            color: 0x0c1527,
            metalness: 0.78,
            roughness: 0.28,
            name: 'KAIROS_ObsidianArmor'
          });

          const carbonUndersuitMat = new THREE.MeshStandardMaterial({
            color: 0x06080e,
            metalness: 0.35,
            roughness: 0.72,
            name: 'KAIROS_CarbonUndersuit'
          });

          let spineBone = null;
          let headBone = null;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              if (
                child.name === 'Beta_Surface' ||
                child.name === 'Mesh.001' ||
                (child.material && child.material.name.includes('HighLimbs'))
              ) {
                child.material = obsidianArmorMat;
              } else if (
                child.name === 'Beta_Joints' ||
                child.name === 'Mesh' ||
                (child.material && child.material.name.includes('Joints'))
              ) {
                child.material = carbonUndersuitMat;
              }

              if (child.material && child.material.emissive && child.material.emissive.getHex() > 0) {
                plasmaMaterials.push(child.material);
              }
            }

            if (child.isBone) {
              if (child.name === 'mixamorigSpine2' || child.name === 'mixamorig:Spine2') spineBone = child;
              if (child.name === 'mixamorigHead' || child.name === 'mixamorig:Head') headBone = child;
            }
          });

          // Add KAIROS Glowing Energy Core to chest bone (compensating for 0.01 armature scale)
          if (spineBone) {
            const chestCore = new THREE.Group();
            chestCore.scale.set(100, 100, 100);
            chestCore.position.set(0, 12, 14.5);

            const coreGlow = new THREE.Mesh(
              new THREE.SphereGeometry(0.045, 16, 16),
              new THREE.MeshStandardMaterial({
                color: 0x00F0FF,
                emissive: 0x00F0FF,
                emissiveIntensity: 4.5,
                roughness: 0.1
              })
            );
            plasmaMaterials.push(coreGlow.material);
            chestCore.add(coreGlow);

            const coreRing = new THREE.Mesh(
              new THREE.TorusGeometry(0.065, 0.009, 8, 24),
              new THREE.MeshStandardMaterial({
                color: 0x1A6CFF,
                emissive: 0x00F0FF,
                emissiveIntensity: 2.8,
                metalness: 0.9,
                roughness: 0.1
              })
            );
            plasmaMaterials.push(coreRing.material);
            chestCore.add(coreRing);

            const corePointLight = new THREE.PointLight(0x00F0FF, 1.8, 2.5);
            corePointLight.position.set(0, 0, 0.08);
            chestCore.add(corePointLight);

            spineBone.add(chestCore);
          }

          // Add Electric Visor Slit Glow to head bone (compensating for 0.01 armature scale)
          if (headBone) {
            const visorGlow = new THREE.Group();
            visorGlow.scale.set(100, 100, 100);
            visorGlow.position.set(0, 10, 11.5);

            const visorMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.12, 0.016, 0.04),
              new THREE.MeshStandardMaterial({
                color: 0x00F0FF,
                emissive: 0x00F0FF,
                emissiveIntensity: 4.5,
                roughness: 0.1
              })
            );
            plasmaMaterials.push(visorMesh.material);
            visorGlow.add(visorMesh);

            headBone.add(visorGlow);
          }

          // Setup AnimationMixer for natural idle breathing
          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            const idleClip =
              gltf.animations.find((a) => a.name.toLowerCase().includes('idle')) ||
              gltf.animations[0];
            if (idleClip) {
              const idleAction = mixer.clipAction(idleClip);
              idleAction.setEffectiveTimeScale(0.85);
              idleAction.play();
            }
          }

          stageGroup.add(model);
          isModelReady = true;
          setIsModelLoaded(true);
        },
        undefined,
        (err) => {
          console.warn(`Could not load ${url}:`, err);
          if (!isFallback) {
            loadGLB(fallbackUrl, true);
          } else {
            console.error('Failed to load 3D Guardian model fallback.');
          }
        }
      );
    };

    loadGLB(modelUrl);

    // 6. Ambient Cyber Embers rising from the city below
    const emberCount = 180;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 6.5;
      emberPositions[i * 3 + 1] = Math.random() * 4.8;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
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

    // 7. 360° Drag & Inertia Interaction Physics (Unified Pointer Events)
    let isUserDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;
    const friction = 0.93;

    const onPointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      setHasInteracted(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e) => {
      if (!isUserDragging) return;
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      stageGroup.rotation.y += deltaX * 0.009;
      stageGroup.rotation.x = Math.max(-0.25, Math.min(0.25, stageGroup.rotation.x + deltaY * 0.0035));

      rotationVelocityY = deltaX * 0.009;
      rotationVelocityX = deltaY * 0.0035;
    };

    const onPointerUp = (e) => {
      if (!isUserDragging) return;
      isUserDragging = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointercancel', onPointerUp);

    // 8. 60 FPS Render & Animation Loop
    let animationFrameId;
    let revealProgress = 0;
    const revealDuration = 1.6;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Skeletal animation mixer update
      if (mixer) {
        mixer.update(delta);
      }

      // Smooth Reveal Transition upon model load
      if (isModelReady && revealProgress < 1.0) {
        revealProgress = Math.min(1.0, revealProgress + delta / revealDuration);
        const ease = 1 - Math.pow(1 - revealProgress, 3);
        stageGroup.position.y = -0.3 + ease * 0.3;
        const scaleVal = 0.9 + ease * 0.1;
        stageGroup.scale.set(scaleVal, scaleVal, scaleVal);

        if (revealProgress >= 1.0) {
          setIsRevealed(true);
        }
      }

      // Drag inertia & ambient auto-orbit drift
      if (!isUserDragging) {
        if (Math.abs(rotationVelocityY) > 0.0002 || Math.abs(rotationVelocityX) > 0.0002) {
          stageGroup.rotation.y += rotationVelocityY;
          stageGroup.rotation.x = Math.max(-0.25, Math.min(0.25, stageGroup.rotation.x + rotationVelocityX));

          rotationVelocityY *= friction;
          rotationVelocityX *= friction;
        } else if (!hasInteracted) {
          // Gentle cinematic orbit float when untouched
          stageGroup.rotation.y += 0.0015;
        }
      }

      // Subtle base pedestal ring rotation
      if (baseRing) {
        baseRing.rotation.z += 0.004;
      }
      if (innerRing) {
        innerRing.rotation.z -= 0.006;
      }
      if (haloRing) {
        haloRing.rotation.z += 0.002;
      }

      // Pulse on Chevron Core & Energy Channels
      const corePulse = 3.2 + Math.sin(elapsedTime * 2.6) * 1.0;
      plasmaMaterials.forEach((mat) => {
        mat.emissiveIntensity = corePulse;
      });

      // Cyber Embers rising
      const emberArr = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        emberArr[i * 3 + 1] += 0.012;
        if (emberArr[i * 3 + 1] > 4.8) {
          emberArr[i * 3 + 1] = 0;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 560;
      const newH = container.clientHeight || 680;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
      envScene.dispose?.();
      envTexture.dispose?.();
      renderer.dispose();
    };
  }, [hasInteracted]);

  return (
    <div
      className={`guardian-3d-wrapper ${isRevealed ? 'system-active' : ''}`}
      role="region"
      aria-label="Interactive 3D KAIROS Superhero Model"
    >
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

      {/* High-Tech Model Loading Pill */}
      {!isModelLoaded && (
        <div className="guardian-model-loader" aria-live="polite">
          <span className="status-dot pulsing"></span>
          <span>CALIBRATING KAIROS 3D GUARDIAN...</span>
        </div>
      )}

      {/* Cinematic Overlays matching reference */}
      <div className="guardian-cinematic-overlay">
        <div className="guardian-lore-quote">
          <span>“A STRONGER TOMORROW IS A KINDER TODAY.”</span>
        </div>

        <div className="guardian-directive-badge">
          <span className="directive-header">KAIROS</span>
          <span className="directive-item">DIFFERENT •</span>
          <span className="directive-item">SAFER •</span>
          <span className="directive-item">TOGETHER •</span>
        </div>
      </div>
    </div>
  );
}
