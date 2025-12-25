
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCMS } from '../CMSContext';

const Navbar: React.FC = () => {
  const { data } = useCMS();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Prompts', path: '/prompts' },
    { name: 'Face Swap', path: '/face-swap' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="glass-dark rounded-full px-8 py-3 flex items-center gap-12 border-white/10 shadow-2xl">
        <Link to="/" className="text-xl font-bold font-heading tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 group-hover:rotate-12 transition-transform" />
          {data.config.name}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium hover:text-indigo-400 transition-colors ${location.pathname === link.path ? 'text-indigo-400' : 'text-white/70'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link to="/prompts" className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const { data } = useCMS();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <footer className="border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold font-heading">{data.config.name}</h2>
          <p className="text-white/40 mt-2">Next generation AI creative studio.</p>
        </div>
        <div className="flex gap-8 text-white/50 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 min-h-[calc(100vh-200px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
