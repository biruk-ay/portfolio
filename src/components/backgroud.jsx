import { OrbitControls, Stars, Text  } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Projects from './projects';

const StarsBg = ({ onEnterProjects }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={ref}>
      <Stars saturation={50} count={10000} speed={1} fade={false} factor={2} depth={50} radius={100} />
      <SphereClick onEnterProjects={onEnterProjects}/>
    </group>
  );
};

const SphereClick = ({ onEnterProjects }) => {
  const ref = useRef();
  useFrame((state,delta) => {
    ref.current.rotation.y += delta * 0.1
  })
  return (
    <group>
      <mesh position={[300,0,0]} ref={ref} onClick={onEnterProjects}>
        <sphereGeometry args={[10,100,10]} />
        <meshBasicMaterial color={'white'}/>
      </mesh>
      <Text position={[300,15,0]} fontSize={5} color="white">Projects</Text>
    </group>
  )
}

const Background = ({ onEnterProjects }) => {

  return (
    <>
      <group>
      <StarsBg onEnterProjects={onEnterProjects} />
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} color={'red'} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} />
        </EffectComposer>        
      </group>
    </>
  );
};

export default Background;
