/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/ThemeContext";

// Scene controller to manage camera and animations
function SceneController() {
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    // Gentle camera movement influenced by mouse position
    const t = clock.getElapsedTime();
    const baseX = Math.sin(t * 0.1) * 1.5;
    const baseY = 1 + Math.sin(t * 0.05) * 0.3;

    // Add mouse influence (reduced effect for subtlety)
    camera.position.x = baseX + mousePosition.current.x * 0.5;
    camera.position.y = baseY + mousePosition.current.y * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Floating code particles component - simplified version
function CodeParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  const count = 100; // Reduced count for better performance
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
  });
  
  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }).map((_, i) => {
        // Create a deterministic but random-looking pattern
        const angle = (i / count) * Math.PI * 20;
        const radius = 5 + Math.sin(i * 0.3) * 3;
        const y = (i / count) * 10 - 5 + Math.sin(i * 0.5) * 2;
        
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Choose color based on position
        const colorIndex = i % 5;
        // Brighter colors for better visibility
        const colors = ["#19A7CE", "#FDBE34", "#FF6B6B", "#4ECDC4", "#9D65C9"];
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} /> {/* Slightly larger boxes */}
            <meshStandardMaterial 
              color={colors[colorIndex]} 
              emissive={colors[colorIndex]} 
              emissiveIntensity={1.2} // Increased emissive intensity
              transparent={true}
              opacity={0.9} // Increased opacity
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Laptop() {
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!laptopRef.current) return;
    
    const t = state.clock.getElapsedTime();
    laptopRef.current.rotation.y = Math.sin(t * 0.3) * 0.2 + Math.PI * 0.25;
    laptopRef.current.position.y = Math.sin(t * 0.5) * 0.1 - 0.5;
    laptopRef.current.position.x = -2;
    laptopRef.current.position.z = -1;
  });

  return (
    <group ref={laptopRef}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.55, -0.4]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Screen display */}
      <mesh position={[0, 0.55, -0.37]} rotation={[Math.PI / 6, 0, 0]}>
        <planeGeometry args={[1.3, 0.7]} />
        <meshBasicMaterial color="#19A7CE" />
      </mesh>
      
      {/* Add keyboard glow */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshBasicMaterial color="#19A7CE" opacity={0.5} transparent={true} />
      </mesh>
      
      {/* Add a point light for better glow effect */}
      <pointLight position={[0, 0.3, 0]} intensity={2.0} distance={3} color="#19A7CE" />
    </group>
  );
}

function AiBrain() {
  const brainRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!brainRef.current) return;
    
    const t = state.clock.getElapsedTime();
    brainRef.current.rotation.y = t * 0.2;
    brainRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    brainRef.current.position.x = 2;
    brainRef.current.position.y = 0.5;
    brainRef.current.position.z = -1;
  });
  
  return (
    <group ref={brainRef}>
      {/* Brain core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#FDBE34" 
          emissive="#FDBE34" 
          emissiveIntensity={1.8} // Increased emissive intensity
          wireframe 
        />
      </mesh>
      
      {/* Neural connections - using deterministic positions */}
      {Array.from({ length: 20 }).map((_, i) => {
        // Use deterministic positions based on index
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;
        const z = Math.sin(angle * 2) * radius * 0.5;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 8, 8]} /> {/* Slightly larger nodes */}
            <meshStandardMaterial 
              color="#19A7CE" 
              emissive="#19A7CE" 
              emissiveIntensity={2.0} // Increased emissive intensity
            />
          </mesh>
        );
      })}
      
      {/* Add connecting lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const startAngle = (i / 15) * Math.PI * 2;
        const endAngle = ((i + 5) / 15) * Math.PI * 2;

        const startRadius = 0.8;
        const startX = Math.sin(startAngle) * startRadius;
        const startY = Math.cos(startAngle) * startRadius;
        const startZ = Math.sin(startAngle * 2) * startRadius * 0.5;

        const endRadius = 0.8;
        const endX = Math.sin(endAngle) * endRadius;
        const endY = Math.cos(endAngle) * endRadius;
        const endZ = Math.sin(endAngle * 2) * endRadius * 0.5;

        // Create a line geometry
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(startX, startY, startZ));
        points.push(new THREE.Vector3(endX, endY, endZ));

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive 
            key={`line-${i}`} 
            object={new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({ 
                color: "#19A7CE", 
                linewidth: 3,
                transparent: true,
                opacity: 0.9
              })
            )} 
          />
        );
      })}
      
      {/* Add glowing effect for better visibility */}
      <pointLight position={[0, 0, 0]} intensity={1.8} distance={3} color="#FDBE34" />
    </group>
  );
}

// Interactive object that follows cursor
function CursorFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef(new THREE.Vector3(0, 0, -3));
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      
      // Project mouse position to 3D space
      const vector = new THREE.Vector3(
        mousePosition.current.x, 
        mousePosition.current.y, 
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      targetPosition.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Smooth follow with easing
    meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * 0.1;
    meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * 0.1;
    meshRef.current.position.z = -3; // Keep at fixed distance from camera
    
    // Add some rotation based on movement
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial 
        color="#19A7CE" 
        emissive="#19A7CE" 
        emissiveIntensity={1.5}
        wireframe 
      />
      <pointLight intensity={0.5} distance={1.5} color="#19A7CE" />
    </mesh>
  );
}

// Export a single component with a consistent name
export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Cleanup function to help with component unmounting
    return () => {
      // Dispose of any Three.js resources if needed
    };
  }, []);
  
  if (!mounted) {
    return null; // Return null on server-side
  }
  
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ position: 'absolute', pointerEvents: 'auto' }}
        frameloop="always"
        camera={{ position: [0, 1, 5], fov: 60 }}
      >
        <SceneController />
        
        {/* Enhanced lighting for better visibility */}
        <ambientLight intensity={3.5} /> {/* Increased ambient light */}
        <directionalLight position={[10, 10, 5]} intensity={4.5} /> {/* Increased directional light */}
        <spotLight position={[0, 5, 0]} intensity={4} angle={0.5} penumbra={1} /> {/* Increased spot light */}
        <pointLight position={[-2, 0, -1]} intensity={3.5} distance={8} color="#19A7CE" /> {/* Increased point light */}
        <pointLight position={[2, 0.5, -1]} intensity={3.5} distance={8} color="#FDBE34" /> {/* Increased point light */}
        
        <CodeParticles />
        <Laptop />
        <AiBrain />
        <CursorFollower />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
