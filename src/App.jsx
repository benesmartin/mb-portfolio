import About from "./components/About";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";

const App = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="max-w-5xl mx-auto px-4">
        <Header />
        <main className="max-w-5xl">
          <Hero />
          <About />
          <Experience />
        </main>
      </div>
    </>
  );
};

export default App;
