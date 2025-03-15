import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import Background from '../components/backgroud';

const Landing = () => {

    return (
        <>
        <div className='fixed top-0 left-0 w-screen h-screen bg-black'>
            <Canvas className='w-full h-full'>
                <Perf position="top left" />
                <Background />
            </Canvas>

        </div>
        </>
    )
}

export default Landing;