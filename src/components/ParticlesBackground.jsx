import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 60,
      particles: {
        move: {
          enable: true,
          speed: { min: 1, max: 6 },
        },
        number: {
          value: 20,
          max: 30,
        },
        opacity: {
          value: 0.4,
        },
        rotate: {
          path: true,
        },
        shape: {
          options: {
            image: {
              gif: true,
              height: 100,
              src: "/logo.png",
              width: 100,
            },
          },
          type: "image",
        },
        size: {
          value: {
            min: 32,
            max: 64,
          },
        },
        detectRetina: true,
      },
    }),
    []
  );

  if (init) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return <></>;
};

export default ParticlesBackground;

{
  /* <video
          className="w-full mt-5 rounded-2xl shadow-lg"
          autoPlay
          muted
          loop
        >
          <source src="/money.mp4" type="video/mp4" />
          Tvůj prohlížeč nepodporuje video tag...
        </video> */
}
