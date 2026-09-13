import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HolographicGlobe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Outer Holographic Wireframe Sphere
    const wireframeGeo = new THREE.SphereGeometry(1.2, 24, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(1.14, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x051328,
      transparent: true,
      opacity: 0.85
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 3. Latitude & Longitude Highlight Rings
    const ringGeo = new THREE.TorusGeometry(1.22, 0.012, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.75
    });

    const eqRing = new THREE.Mesh(ringGeo, ringMat);
    eqRing.rotation.x = Math.PI / 2;
    globeGroup.add(eqRing);

    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 4;
    globeGroup.add(orbitRing);

    // 4. Global Hotspot / Safe Zone Node Markers
    const nodeCoords = [
      { lat: 40.7, lon: -74.0, alert: false },   // North America
      { lat: 51.5, lon: -0.1, alert: false },    // Europe
      { lat: 35.6, lon: 139.6, alert: false },   // Asia
      { lat: -33.8, lon: 151.2, alert: false },  // Oceania
      { lat: 28.6, lon: 77.2, alert: true },     // Alert zone
      { lat: -22.9, lon: -43.1, alert: false }   // South America
    ];

    const nodesGroup = new THREE.Group();
    globeGroup.add(nodesGroup);

    nodeCoords.forEach((coord) => {
      const phi = (90 - coord.lat) * (Math.PI / 180);
      const theta = (coord.lon + 180) * (Math.PI / 180);
      const r = 1.22;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const dotGeo = new THREE.SphereGeometry(coord.alert ? 0.045 : 0.035, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: coord.alert ? 0xFF3B30 : 0x00FF88
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      nodesGroup.add(dot);
    });

    // 5. Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.005;
      globeGroup.rotation.x = 0.22;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 220;
      const h = container.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="holographic-globe-canvas" />;
}
