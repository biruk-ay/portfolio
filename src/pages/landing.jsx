import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useState } from "react";
import Background from "../components/backgroud";
import Projects from "../components/projects";
const Landing = () => {
  const [showProjects, setShowProjects] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black">
        <Canvas className="w-full h-full">
          {/* <Perf position="top left" /> */}
          {showProjects ? (
            <Projects onBack={() => setShowProjects(false)} />
          ) : (
            <Background onEnterProjects={() => setShowProjects(true)} />
          )}
        </Canvas>
        {/* <Projects /> */}
      </div>
    </>
  );
};

export default Landing;
