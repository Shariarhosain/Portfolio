import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 text-white">
          <Header />
          <main className="relative overflow-x-hidden">
            <Hero />
            <About />
            <Experience />
            <Skills />
      
            <Projects />
                  <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
