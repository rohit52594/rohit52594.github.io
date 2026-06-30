import { ScrollProvider } from './context/ScrollContext';
import StippleField from './components/StippleField';
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
      <StippleField />
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
      <div className="grain-overlay" aria-hidden="true" />
    </ScrollProvider>
  );
}

export default App;
