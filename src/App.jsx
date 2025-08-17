import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";
import Projects from "./components/Projects";

const App = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <main className="max-w-5xl mx-auto">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
