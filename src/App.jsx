import { ScrollProvider } from './context/ScrollContext';
import ParticleUniverse from './components/three/ParallaxWorld';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <ScrollProvider>
      <ParticleUniverse />
      <ScrollProgress />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ScrollProvider>
  );
}

export default App;
