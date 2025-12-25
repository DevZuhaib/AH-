
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './CMSContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import PromptGenerator from './pages/PromptGenerator';
import FaceSwap from './pages/FaceSwap';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/Dashboard';

const App: React.FC = () => {
  return (
    <CMSProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prompts" element={<PromptGenerator />} />
                <Route path="/face-swap" element={<FaceSwap />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </CMSProvider>
  );
};

export default App;
