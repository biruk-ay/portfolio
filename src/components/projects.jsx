import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Text, Html, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

const FirstPersonCamera = ({ focused, focusPosition }) => {
  const { camera } = useThree();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      if (!focused) {
        setPosition((prev) => prev - event.deltaY * 0.01);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [focused]);

  useFrame(() => {
    if (focused) {
      gsap.to(camera.position, {
        x: focusPosition[0],
        y: focusPosition[1],
        z: focusPosition[2],
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () =>
          camera.lookAt(
            focusPosition[0],
            focusPosition[1],
            focusPosition[2] - 2
          ),
      });
    } else {
      camera.position.set(0, 2, position);
      camera.lookAt(0, 2, position - 5);
    }
  });

  return <></>;
};

const Billboard = ({ position, project, onClick, isFocused, onBack }) => {
  return (
    <group position={position}>
      <mesh onClick={() => onClick(position)}>
        <planeGeometry args={[4, 3]} />
        <meshBasicMaterial color={"white"} opacity={1} />
      </mesh>
      <Html
        position={[0, 1, 0.2]}
        className="w-64 p-4 bg-white rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-bold text-gray-700">{project.title}</h3>
        <p className="text-sm text-gray-700">{project.description}</p>
        <div className="mt-2">
          <a
            href={project.github}
            target="_blank"
            className="text-blue-500 mr-2"
          >
            GitHub
          </a>
          <a href={project.deploy} target="_blank" className="text-green-500">
            Live Demo
          </a>
        </div>
        {isFocused && (
          <button
            onClick={onBack}
            className="absolute top-2 right-2 bg-red-500 text-white rounded"
          >
            Back
          </button>
        )}
      </Html>
    </group>
  );
};

const Projects = () => {
  const [focused, setFocused] = useState(false);
  const [focusPosition, setFocusPosition] = useState([0, 2, 5]);

  const projects = [
    {
      title: "Gebeya",
      description: "A place to shop for your needs",
      github: "#",
      deploy: "https://ticket-frontend-five.vercel.app/",
    },
    {
      title: "Ticket",
      description: "Get your tickets",
      github: "#",
      deploy: "https://ecommerce-frontend-lz6z.onrender.com/",
    },
  ];

  const handleBillboardClick = (position) => {
    setFocusPosition([position[0], position[1], position[2] + 2]);
    setFocused(true);
  };

  const handleBack = () => {
    setFocused(false);
  };

  return (
    <>
      <FirstPersonCamera focused={focused} focusPosition={focusPosition} />
      <ambientLight intensity={0.5} />

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={0.3}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#a0a0a0"
          metalness={0.5}
        />
      </mesh>

      <Text position={[0, 10, -15]} fontSize={4} color="white">
        Projects
      </Text>

      <Billboard
        position={[-5, 2, 10]}
        project={projects[0]}
        onClick={handleBillboardClick}
        isFocused={focused}
        onBack={handleBack}
      />
      <Billboard
        position={[5, 2, 15]}
        project={projects[1]}
        onClick={handleBillboardClick}
        isFocused={focused}
        onBack={handleBack}
      />
    </>
  );
};

export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import { gsap } from 'gsap';

// const FirstPersonCamera = ({ focused, focusPosition }) => {
//   const { camera } = useThree();
//   const [position, setPosition] = useState(0);

//   const handleScroll = (event) => {
//     if (!focused) {
//       setPosition((prev) => prev - event.deltaY * 0.01);
//     }
//   };

//   useFrame(() => {
//     if (focused) {
//       gsap.to(camera.position, {
//         x: focusPosition[0],
//         y: focusPosition[1],
//         z: focusPosition[2],
//         duration: 1,
//         ease: 'power2.inOut',
//         onUpdate: () => camera.lookAt(focusPosition[0], focusPosition[1], focusPosition[2] - 2),
//       });
//     } else {
//       camera.position.set(0, 2, position);
//     }
//   });

//   return <></>;
// };

// const Billboard = ({ position, project, onClick, isFocused, onBack }) => {
//   return (
//     <group position={position}>
//       <mesh onClick={() => onClick(position)}>
//         <planeGeometry args={[4, 3]} />
//         <meshBasicMaterial color={'white'} opacity={0.7} transparent />
//       </mesh>
//       <Html position={[0, 0, 0.2]} className="w-64 p-4 bg-white rounded-lg shadow-lg">
//         <h3 className="text-lg font-bold">{project.title}</h3>
//         <p className="text-sm text-gray-700">{project.description}</p>
//         <div className="mt-2">
//           <a href={project.github} target="_blank" className="text-blue-500 mr-2">GitHub</a>
//           <a href={project.deploy} target="_blank" className="text-green-500">Live Demo</a>
//         </div>
//         {isFocused && (
//           <button onClick={onBack} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Back</button>
//         )}
//       </Html>
//     </group>
//   );
// };

// const Projects = () => {
//   const [focused, setFocused] = useState(false);
//   const [focusPosition, setFocusPosition] = useState([0, 2, 5]);

//   const projects = [
//     { title: "Project 1", description: "A cool project.", github: "#", deploy: "#" },
//     { title: "Project 2", description: "Another cool project.", github: "#", deploy: "#" }
//   ];

//   const handleBillboardClick = (position) => {
//     setFocusPosition([position[0], position[1], position[2] + 2]);
//     setFocused(true);
//   };

//   const handleBack = () => {
//     setFocused(false);
//   };

//   return (
//     <Canvas onWheel={(e) => e.stopPropagation()}>
//       <FirstPersonCamera focused={focused} focusPosition={focusPosition} />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 5, -5]} fontSize={1} color="white">Look Up!</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -2]} project={projects[0]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//       <Billboard position={[5, 2, -2]} project={projects[1]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//     </Canvas>
//   );
// };

// export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';

// const FirstPersonCamera = ({ focused, focusPosition, position }) => {
//   const { camera } = useThree();

//   useFrame(() => {
//     if (focused) {
//       camera.position.lerp(new THREE.Vector3(...focusPosition), 0.1);
//       camera.lookAt(...focusPosition);
//     } else {
//       camera.position.set(0, 2, position);
//     }
//   });

//   return null;
// };

// const Billboard = ({ position, project, onClick, isFocused, onBack }) => {
//   return (
//     <group position={position}>
//       <mesh onClick={() => onClick(position)}>
//         <planeGeometry args={[4, 3]} />
//         <meshBasicMaterial color={'white'} opacity={0.7} transparent />

//         </mesh>
//       <Html position={position} className="w-64 p-4 bg-white rounded-lg shadow-lg">
//         <h3 className="text-lg font-bold text-gray-700">{project.title}</h3>
//         <p className="text-sm text-gray-700">{project.description}</p>
//         <div className="mt-2">
//           <a href={project.github} target="_blank" className="text-blue-500 mr-2">GitHub</a>
//           <a href={project.deploy} target="_blank" className="text-green-500">Live Demo</a>
//         </div>
//         {isFocused && (
//           <button onClick={onBack} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Back</button>
//         )}
//       </Html>
//     </group>
//   );
// };

// const Projects = () => {
//   const [focused, setFocused] = useState(false);
//   const [focusPosition, setFocusPosition] = useState([0, 2, 5]);
//   const [position, setPosition] = useState(0);

//   const handleScroll = (event) => {
//     if (!focused) {
//       setPosition((prev) => prev - event.deltaY * 0.01);
//     }
//   };

//   const projects = [
//     { title: "Project 1", description: "A cool project.", github: "#", deploy: "#" },
//     { title: "Project 2", description: "Another cool project.", github: "#", deploy: "#" }
//   ];

//   const handleBillboardClick = (position) => {
//     setFocusPosition([position[0], position[1], position[2] + 2]);
//     setFocused(true);
//   };

//   const handleBack = () => {
//     setFocused(false);
//   };

//   return (
//     <Canvas onWheel={handleScroll}>
//       <FirstPersonCamera focused={focused} focusPosition={focusPosition} position={position} />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 10, -5]} fontSize={4} color="white">Projects</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -2]} project={projects[0]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//       <Billboard position={[5, 2, -2]} project={projects[1]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//     </Canvas>
//   );
// };

// export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';

// const FirstPersonCamera = ({ focused, focusPosition, onReset }) => {
//   const { camera } = useThree();
//   const [position, setPosition] = useState(0);

//   const handleScroll = (event) => {
//     if (!focused) {
//       setPosition((prev) => prev - event.deltaY * 0.01);
//     }
//   };

//   useFrame(() => {
//     if (focused) {
//       camera.position.lerp(new THREE.Vector3(...focusPosition), 0.1);
//       camera.lookAt(...focusPosition);
//     } else {
//       camera.position.set(0, 2, position);
//     }
//   });

//   return <></>;
// };

// const Billboard = ({ position, project, onClick, isFocused, onBack }) => {
//   return (
//     <group position={position}>
//       <mesh onClick={() => onClick(position)}>
//         <planeGeometry args={[4, 3]} />
//         <meshBasicMaterial color={'white'} opacity={0.7} transparent />
//       </mesh>
//       <Html position={[0, 0, 0.1]} className="w-64 p-4 bg-white rounded-lg shadow-lg">
//         <h3 className="text-lg font-bold">{project.title}</h3>
//         <p className="text-sm text-gray-700">{project.description}</p>
//         <div className="mt-2">
//           <a href={project.github} target="_blank" className="text-blue-500 mr-2">GitHub</a>
//           <a href={project.deploy} target="_blank" className="text-green-500">Live Demo</a>
//         </div>
//         {isFocused && (
//           <button onClick={onBack} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Back</button>
//         )}
//       </Html>
//     </group>
//   );
// };

// const Projects = () => {
//   const [focused, setFocused] = useState(false);
//   const [focusPosition, setFocusPosition] = useState([0, 2, 5]);

//   const projects = [
//     { title: "Project 1", description: "A cool project.", github: "#", deploy: "#" },
//     { title: "Project 2", description: "Another cool project.", github: "#", deploy: "#" }
//   ];

//   const handleBillboardClick = (position) => {
//     setFocusPosition([position[0], position[1], position[2] + 2]);
//     setFocused(true);
//   };

//   const handleBack = () => {
//     setFocused(false);
//   };

//   return (
//     <Canvas onWheel={handleScroll}>
//       <FirstPersonCamera focused={focused} focusPosition={focusPosition} onReset={handleBack} />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 5, -5]} fontSize={1} color="white">Look Up!</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -2]} project={projects[0]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//       <Billboard position={[5, 2, -2]} project={projects[1]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//     </Canvas>
//   );
// };

// export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';

// const FirstPersonCamera = ({ focused, focusPosition, onReset }) => {
//   const { camera } = useThree();
//   const [position, setPosition] = useState(0);

//   const handleScroll = (event) => {
//     if (!focused) {
//       setPosition((prev) => prev + event.deltaY * 0.01);
//     }
//   };

//   useFrame(() => {
//     if (focused) {
//       camera.position.lerp(new THREE.Vector3(...focusPosition), 0.1);
//       camera.lookAt(...focusPosition);
//     } else {
//       camera.position.set(0, 2, position);
//     }
//   });

//   return <></>;
// };

// const Billboard = ({ position, project, onClick, isFocused, onBack }) => {
//   return (
//     <group position={position}>
//       <mesh onClick={() => onClick(position)}>
//         <planeGeometry args={[4, 3]} />
//         <meshBasicMaterial color={'white'} opacity={0.7} transparent />
//       </mesh>
//       <Html position={[0, 0, 0.1]} className="w-64 p-4 bg-white rounded-lg shadow-lg">
//         <h3 className="text-lg font-bold">{project.title}</h3>
//         <p className="text-sm text-gray-700">{project.description}</p>
//         <div className="mt-2">
//           <a href={project.github} target="_blank" className="text-blue-500 mr-2">GitHub</a>
//           <a href={project.deploy} target="_blank" className="text-green-500">Live Demo</a>
//         </div>
//         {isFocused && (
//           <button onClick={onBack} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Back</button>
//         )}
//       </Html>
//     </group>
//   );
// };

// const Projects = () => {
//   const [focused, setFocused] = useState(false);
//   const [focusPosition, setFocusPosition] = useState([0, 2, 5]);

//   const projects = [
//     { title: "klsfjsldfjsdlfj", description: "A cool project. aldkfjlsjfsdfjl sldjsdlfjslfj sdoifjsldkfj ", github: "#", deploy: "#" },
//     { title: "Project 2", description: "Another cool project.", github: "#", deploy: "#" }
//   ];

//   const handleBillboardClick = (position) => {
//     setFocusPosition([position[0], position[1], position[2] + 2]);
//     setFocused(true);
//   };

//   const handleBack = () => {
//     setFocused(false);
//   };

//   return (
//     <Canvas onWheel={(e) => e.stopPropagation()}>
//       <FirstPersonCamera focused={focused} focusPosition={focusPosition} onReset={handleBack} />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 5, -5]} fontSize={1} color="white">Look Up!</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -2]} project={projects[0]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//       <Billboard position={[5, 2, -2]} project={projects[1]} onClick={handleBillboardClick} isFocused={focused} onBack={handleBack} />
//     </Canvas>
//   );
// };

// export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef, useEffect } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';

// const FirstPersonCamera = () => {
//   const { camera } = useThree();
//   const positionRef = useRef(0);

//   useEffect(() => {
//     const handleScroll = (event) => {
//       positionRef.current += event.deltaY * 0.01;
//     };
//     window.addEventListener('wheel', handleScroll);
//     return () => window.removeEventListener('wheel', handleScroll);
//   }, []);

//   useFrame(() => {
//     camera.position.set(0, 2, positionRef.current);
//   });

//   return null;
// };

// const Billboard = ({ position, text, onClick }) => {
//   return (
//     <mesh position={position} onClick={() => onClick(text)}>
//       <planeGeometry args={[4, 10]} />
//       <meshBasicMaterial color={'blue'} />
//       <Html ></Html>
//       <Text position={[0, 0, 0.1]} fontSize={0.5} color="white">{text}</Text>
//     </mesh>
//   );
// };

// const Projects = () => {
//   const [displayText, setDisplayText] = useState('');

//   return (
//     <Canvas>
//       <FirstPersonCamera />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 500]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 15, -20]} fontSize={5} color="white">Projects</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -5]} text="Left Billboard" onClick={setDisplayText} />
//       <Billboard position={[5, 2, -6]} text="Right Billboard" onClick={setDisplayText} />

//       {/* Displayed text when billboard clicked */}
//       {displayText && (
//         <Html position={[0, 2, -1]}>
//           <div className='bg-black'>{displayText}</div>
//         </Html>
//       )}
//     </Canvas>
//   );
// };

// export default Projects;

// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useState, useRef } from 'react';
// import { Text, Html } from '@react-three/drei';
// import * as THREE from 'three';

// const FirstPersonCamera = () => {
//   const { camera } = useThree();
//   const [position, setPosition] = useState(0);

//   const handleScroll = (event) => {
//     setPosition((prev) => prev + event.deltaY * 0.01);
//   };

//   useFrame(() => {
//     camera.position.set(0, 2, position);
//   });

//   return <></>;
// };

// const Billboard = ({ position, text, onClick }) => {
//   return (
//     <mesh position={position} onClick={() => onClick(text)}>
//       <planeGeometry args={[3, 2]} />
//       <meshBasicMaterial color={'blue'} />
//       <Text position={[0, 0, 0.1]} fontSize={0.5} color="white">{text}</Text>
//     </mesh>
//   );
// };

// const Projects = () => {
//   const [displayText, setDisplayText] = useState('');

//   return (
//     <Canvas onWheel={(e) => e.stopPropagation()} className='w-full h-full'>
//       <FirstPersonCamera />
//       <ambientLight intensity={0.5} />

//       {/* Ground */}
//       <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[50, 50]} />
//         <meshBasicMaterial color={'gray'} />
//       </mesh>

//       {/* Text in the sky */}
//       <Text position={[0, 5, -5]} fontSize={1} color="white">Look Up!</Text>

//       {/* Billboards */}
//       <Billboard position={[-5, 2, -2]} text="Left Billboard" onClick={setDisplayText} />
//       <Billboard position={[5, 2, -2]} text="Right Billboard" onClick={setDisplayText} />

//       {/* Displayed text when billboard clicked */}
//       {displayText && (
//         <Html position={[0, 2, -1]}>
//           <div style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>{displayText}</div>
//         </Html>
//       )}
//     </Canvas>
//   );
// };

// export default Projects;
