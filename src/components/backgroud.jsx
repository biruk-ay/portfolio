import { Trail, OrbitControls, Stars, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


const ShootingStar = () => {
  
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 2
    ref.current.position.set(Math.sin(t) * 4, Math.atan(t) * Math.cos(t / 2) * 2, Math.cos(t) * 4)
  })
  return (
    <Trail width={5} length={8} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.25]} />
        <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
      </mesh>
    </Trail>
  )
}

const ShootingStarV1 = () => {
  
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 2
    ref.current.position.set(Math.sin(t) * 4, Math.atan(t) * Math.cos(t * 2) * 2, Math.cos(t) * 4)
  })
  return (
    <Trail width={5} length={8} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.25]} />
        <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
      </mesh>
    </Trail>
  )
}

const StarsBg = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.01
  })

  return (
    <group ref={ref}>
      <Stars saturation={50} count={10000} speed={1} fade={false} factor={2} depth={50} radius={100} />
      <SphereClick />
    </group>

  )
}

const SphereClick = () => {
  const ref = useRef();
  useFrame((state,delta) => {
    ref.current.rotation.y += delta * 0.1
  })
  return (
    <group>
      <mesh position={[300,0,0]} ref={ref}>
        <sphereGeometry args={[10,100,10]} />
        <meshBasicMaterial color={'white'}/>
      </mesh>
      <Text position={[300,15,0]} fontSize={5} color="white">Experience</Text>
    </group>
  )
}
const Background = () => {

  return (
    <>
        <group>
            <StarsBg />
            <OrbitControls />
            <ambientLight intensity={0.1} />
            <ShootingStar />
            <ShootingStarV1 />
            <directionalLight position={[1, 2, 3]} intensity={1.5} color={'red'} />
            <EffectComposer>
              <Bloom mipmapBlur luminanceThreshold={1} />
            </EffectComposer>
        </group>
    </>
  )
}

export default Background;
