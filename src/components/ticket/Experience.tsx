// @ts-nocheck
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { easing } from "maath";
import ticketsData from "@/data/tickets";
import { useRef } from "react";

interface ExperienceProps {
  hacker: {
    teamName: string;
    email: string;
  };
  theme: number;
}

const Experience: React.FC<ExperienceProps> = ({ hacker, theme }) => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <ambientLight intensity={6} />
      <directionalLight position={[0.01, 0.04, 0.1]} intensity={5} />

      <OrbitControls />
      <Rig>
        <Ticket hacker={hacker} theme={theme} />
      </Rig>
    </Canvas>
  );
};

export default Experience;

function Rig(props) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 5, -state.pointer.y * 5, 20],
      0.3,
      delta,
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Ticket({ hacker, theme }) {
  const texture = useLoader(
    THREE.TextureLoader,
    `${ticketsData[theme - 1].url}`,
  );
  return (
    <Float floatIntensity={1.5} speed={1.5} rotationIntensity={1.5}>
      <mesh>
        <meshStandardMaterial
          map={texture}
          metalness={0.7}
          roughness={0.25}
          transparent
        />
        <Text
          position={[-1.9, -1.0, 0.01]}
          anchorX="left"
          color={theme === 2 ? "black" : "white"}
          fontSize={0.2}
        >
          {hacker?.name}
        </Text>
        <Text
          anchorX="left"
          position={[-1.7, -1.27, 0.01]}
          color={theme === 2 ? "black" : "white"}
          fontSize={0.13}
        >
          {hacker?.teamName}
        </Text>
        <planeGeometry args={[5, 3]} />
      </mesh>
    </Float>
  );
}
