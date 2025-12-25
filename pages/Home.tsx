
import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../CMSContext';

const Home: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      {data.config.isHeroEnabled && (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl text-center space-y-8 animate-float">
            <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tight leading-[1.1]">
              Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Imagination</span> <br /> 
              into Reality.
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Experience the world's most advanced AI creative suite. Generate high-fidelity images, cinematic videos, and realistic face swaps in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link to="/prompts" className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all text-lg shadow-xl shadow-white/10">
                Start Creating
              </Link>
              <Link to="/face-swap" className="w-full sm:w-auto px-10 py-4 glass hover:bg-white/10 font-bold rounded-2xl transition-all text-lg">
                Explore Face Swap
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {data.config.isFeaturesEnabled && (
        <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { title: 'AI Image Engine', desc: 'Photorealistic outputs with Gemini 2.5 Flash.', icon: '✨' },
            { title: 'Cinematic Video', desc: 'Pro-level motion using Veo 3.1 technology.', icon: '🎥' },
            { title: 'Smart Prompts', desc: 'Intelligent prompt expansion for better results.', icon: '🧠' }
          ].map((f, i) => (
            <div key={i} className="glass p-8 rounded-3xl space-y-4 hover:border-white/20 transition-all hover:translate-y-[-10px] group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading">{f.title}</h3>
              <p className="text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Workflow Section */}
      {data.config.isWorkflowEnabled && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="glass rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 overflow-hidden">
            <div className="flex-1 space-y-6">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">The Workflow</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading">From Idea to Render in 3 Simple Steps.</h2>
              <div className="space-y-8 pt-4">
                {[
                  { n: '01', t: 'Enter Your Vision', d: 'Type a few words describing your creative concept.' },
                  { n: '02', t: 'Select Your Model', d: 'Choose between high-fidelity images or cinematic video.' },
                  { n: '03', t: 'Download & Share', d: 'Export in 4K resolution and share your masterpiece.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-2xl font-black text-white/10">{step.n}</div>
                    <div>
                      <h4 className="font-bold text-lg">{step.t}</h4>
                      <p className="text-white/40">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square rounded-[2.5rem] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="https://picsum.photos/600/600?random=50" 
                  alt="AI Workflow Preview" 
                  className="rounded-[2rem] w-4/5 h-4/5 object-cover shadow-2xl transition-transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-6 py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl font-bold font-heading">Ready to unleash your creativity?</h2>
          <p className="text-white/50 text-xl">Join thousands of artists and creators already using NexusAI to build the future of content.</p>
          <div className="pt-8">
            <Link to="/contact" className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-indigo-500/20">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
