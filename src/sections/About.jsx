import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import HireMeButton from "../components/HireMeButton";
import { Frameworks } from "../components/FrameWorks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
    {/* Grid 1 */}
<div className="relative grid-default-color grid-1 h-full min-h-[20rem] md:min-h-0 overflow-hidden rounded-lg">
  {/* Background Image */}
  <img
    src="assets/myprofile.jpg"
    className="absolute inset-0 object-cover w-full h-full"
    alt="Satyam Thakur"
  />
  
  {/* Content Overlay */}
  <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/50 via-black/40 to-transparent">
    <div className="max-w-2xl">
      <p className="headtext !text-white">Hi, I'm Satyam Thakur</p>
      <p className="subtext !text-gray-200 mt-2">
        Over the last 3 years, I developed my frontend and backend dev
        skills to deliver dynamic software and web applications.
      </p>
    </div>
  </div>
</div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
             Remote Developer | Collaborating Across the Globe
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
       {/* Grid 4 */}
<div className="grid-special-color grid-4">
  <div className="flex flex-col items-center justify-center gap-4 size-full">
    <p className="text-center headtext">
      Do you want to start a project together?
    </p>
    <HireMeButton />
    <p className="text-sm text-gray-400">or copy: thakursatyam029@gmail.com</p>
  </div>
</div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;