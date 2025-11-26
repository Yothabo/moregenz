import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import NotFound from './pages/NotFound';
import MetaTags from './components/MetaTags';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Global Meta Tags */}
        <MetaTags />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
