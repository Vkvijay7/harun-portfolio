import KineticGrid from './components/KineticGrid';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { usePalette } from './hooks/usePalette';

export default function App() {
  const { palette, setPalette } = usePalette();

  return (
    <>
      <KineticGrid palette={palette} />
      <div className="vignette" aria-hidden="true" />

      <Nav palette={palette} setPalette={setPalette} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Profile />
        <Capabilities />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
