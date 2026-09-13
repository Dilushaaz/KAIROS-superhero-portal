import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCcw } from 'lucide-react';
import { playClickSound } from '../utils/soundService';

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
    scene.fog = new THREE.FogExp2(0x040711, 0.038);

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 680;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. 5-Point Studio Cinematic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x060D1E, 2.4);
    scene.add(ambientLight);

    // Key Light: Cool Electric Cyan
    const keyLight = new THREE.DirectionalLight(0x00F0FF, 4.2);
    keyLight.position.set(4.5, 6.0, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Rim Light: Intense Royal Blue from rear-left for razor silhouette separation
    const rimLight = new THREE.DirectionalLight(0x1A6CFF, 5.2);
    rimLight.position.set(-4.8, 3.8, -4.2);
    scene.add(rimLight);

    // Secondary Back Rim: Cool Indigo
    const backRim = new THREE.DirectionalLight(0x4A8CFF, 3.0);
    backRim.position.set(3.5, 2.5, -3.8);
    scene.add(backRim);

    // Fill Light: Soft deep navy
    const fillLight = new THREE.DirectionalLight(0x122240, 2.4);
    fillLight.position.set(-3.2, 1.2, 3.2);
    scene.add(fillLight);

    // Chest Core Pulsing Light
    const emblemLight = new THREE.PointLight(0x00F0FF, 3.5, 4.5);
    emblemLight.position.set(0, 1.68, 0.65);
    scene.add(emblemLight);

    // Ground Promontory Bounce Light
    const rockBounceLight = new THREE.PointLight(0x1A6CFF, 1.8, 3.5);
    rockBounceLight.position.set(0, -0.4, 0.85);
    scene.add(rockBounceLight);

    // 3. Master Stage Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Track dynamic meshes inside the loaded GLB
    let capeMesh = null;
    const plasmaMaterials = [];

    // 4. Load the Genuine 3D KAIROS Guardian GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/kairos-guardian.glb',
      (gltf) => {
        const model = gltf.scene;
        model.name = 'KAIROS_3D_Model';
        model.position.set(0, -0.32, 0);
        model.scale.set(1.15, 1.15, 1.15);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name === 'GuardianCapeMesh') {
              capeMesh = child;
            }

            // Collect any emissive / plasma materials for dynamic pulsation
            if (child.material) {
              if (child.material.emissive && child.material.emissive.getHex() > 0) {
                plasmaMaterials.push(child.material);
              }
            }
          }
        });

        stageGroup.add(model);
        setIsModelLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Error loading /models/kairos-guardian.glb:', err);
      }
    );

    // 5. Ambient Cyber Embers rising from the city below
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

    // 6. 360° Drag & Smooth Inertia Interaction Physics
    let isUserDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;
    const friction = 0.94;

    const onPointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      setHasInteracted(true);
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      previousPointerX = clientX;
      previousPointerY = clientY;
      playClickSound();
    };

    const onPointerMove = (e) => {
      if (!isUserDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - previousPointerX;
      const deltaY = clientY - previousPointerY;
      previousPointerX = clientX;
      previousPointerY = clientY;

      stageGroup.rotation.y += deltaX * 0.01;
      stageGroup.rotation.x = Math.max(-0.25, Math.min(0.25, stageGroup.rotation.x + deltaY * 0.004));

      rotationVelocityY = deltaX * 0.01;
      rotationVelocityX = deltaY * 0.004;
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

    // 7. Cinematic Opening Sequence (Darkness -> Rim Light -> Visor & Core Ignite -> Full UI)
    stageGroup.position.y = -0.6;
    stageGroup.scale.set(0.86, 0.86, 0.86);

    let revealProgress = 0;
    const revealDuration = 1.8;

    // 8. 60 FPS Render & Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Cinematic Reveal Transition
      if (revealProgress < 1.0) {
        revealProgress = Math.min(1.0, revealProgress + delta / revealDuration);
        const ease = 1 - Math.pow(1 - revealProgress, 3);
        stageGroup.position.y = -0.6 + ease * 0.6;
        const scaleVal = 0.86 + ease * 0.14;
        stageGroup.scale.set(scaleVal, scaleVal, scaleVal);

        if (revealProgress >= 1.0) {
          setIsRevealed(true);
        }
      }

      // Drag inertia decay
      if (!isUserDragging) {
        stageGroup.rotation.y += rotationVelocityY;
        stageGroup.rotation.x = Math.max(-0.25, Math.min(0.25, stageGroup.rotation.x + rotationVelocityX));

        rotationVelocityY *= friction;
        rotationVelocityX *= friction;

        if (Math.abs(rotationVelocityY) < 0.0008) rotationVelocityY = 0;
        if (Math.abs(rotationVelocityX) < 0.0008) rotationVelocityX = 0;
      }

      // Living idle breathing oscillation
      const breath = Math.sin(elapsedTime * 1.5) * 0.028;
      const kairosModel = stageGroup.getObjectByName('KAIROS_3D_Model');
      if (kairosModel) {
        kairosModel.position.y = -0.32 + breath;
      }

      // Cape Wind Flutter (Procedural wave dynamics)
      if (capeMesh && capeMesh.geometry && capeMesh.geometry.attributes.position) {
        const posAttr = capeMesh.geometry.attributes.position;
        const capeWidthSegments = 16;
        const capeHeightSegments = 24;

        for (let i = 0; i < posAttr.count; i++) {
          const u = (i % (capeWidthSegments + 1)) / capeWidthSegments;
          const v = Math.floor(i / (capeWidthSegments + 1)) / capeHeightSegments;
          const windWave = Math.sin(elapsedTime * 2.8 + v * 3.6 + u * 2.0) * (v * 0.15);
          const windSway = Math.cos(elapsedTime * 2.2 + v * 2.8) * (v * 0.09);
          posAttr.setZ(i, windWave);
          posAttr.setX(i, (u - 0.5) * 1.28 + windSway);
        }
        posAttr.needsUpdate = true;
      }

      // Pulse on Chevron Core & Energy Channels
      const corePulse = 2.8 + Math.sin(elapsedTime * 2.6) * 0.9;
      emblemLight.intensity = corePulse;
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
