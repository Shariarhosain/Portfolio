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
import ErrorBoundary from './components/ErrorBoundary';

import ParticleBackground from './components/ParticleBackground';
import GlowEffect from './components/GlowEffect';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <SEOHead />

          <ParticleBackground />
          <GlowEffect />
          <div className="min-h-screen bg-gradient-to-br from-slate-700 via-blue-700/40 to-gray-700 text-white">
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
    </ErrorBoundary>
  );
}

export default App;
