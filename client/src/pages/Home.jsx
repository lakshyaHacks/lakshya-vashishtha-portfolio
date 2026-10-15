import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Timeline from '../components/Timeline.jsx';
import Certifications from '../components/Certifications.jsx';
import ResumeBand from '../components/ResumeBand.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certifications />
      <ResumeBand />
      <Contact />
    </>
  );
}
