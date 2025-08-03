import Header from "./components/Header";
import ParticlesBackground from "./components/ParticlesBackground";

const App = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="max-w-5xl mx-auto px-4">
        <Header />
      </div>
    </>
  );
};

export default App;
