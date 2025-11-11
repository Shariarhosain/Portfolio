import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MorphingCursor from './components/MorphingCursor';
import ParticleBackground from './components/ParticleBackground';
import GlowEffect from './components/GlowEffect';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEOHead />
        <MorphingCursor />
        <ParticleBackground />
        <GlowEffect />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 text-white">
          <Header />
          <Routes>
            <Route path="/" element={
              <main className="relative overflow-x-hidden">
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Education />
                <Contact />
              </main>
            } />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
