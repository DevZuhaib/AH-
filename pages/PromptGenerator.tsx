
import React, { useState, useEffect } from 'react';
import { generateEnhancedPrompt, generateImage, generateVideo } from '../services/gemini';

const PromptGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true); // Proceed assuming success per instructions
    }
  };

  const handleEnhance = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    try {
      const enhanced = await generateEnhancedPrompt(prompt, activeTab);
      setPrompt(enhanced);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    // Video generation requires a paid API key selected via dialog
    if (activeTab === 'video' && !hasApiKey) {
      await handleSelectKey();
    }

    setIsGenerating(true);
    setResultUrl(null);
    try {
      let url = '';
      if (activeTab === 'image') {
        url = await generateImage(prompt);
      } else {
        url = await generateVideo(prompt);
      }
      setResultUrl(url);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "";
      if (errorMessage.includes("Requested entity was not found") || (err.status === 404)) {
        alert("Video generation requires a paid API key. Please select a valid key from a paid GCP project.");
        setHasApiKey(false);
        await handleSelectKey();
      } else {
        alert("Generation failed. Please ensure you have a valid API key and internet connection.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-bold font-heading">AI Creative Engine</h1>
        <p className="text-white/50">Describe your vision and watch the AI bring it to life.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex gap-2 p-1.5 glass rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('image')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'image' ? 'bg-white text-black' : 'hover:bg-white/5 text-white/60'}`}
            >
              Image Studio
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'video' ? 'bg-white text-black' : 'hover:bg-white/5 text-white/60'}`}
            >
              Video Studio
            </button>
          </div>

          {activeTab === 'video' && !hasApiKey && (
            <div className="glass p-6 rounded-2xl border-indigo-500/30 bg-indigo-500/5 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔑</div>
                <div className="space-y-2">
                  <h4 className="font-bold text-indigo-400">Paid API Key Required for Video</h4>
                  <p className="text-sm text-white/60">
                    To use the Veo video generation model, you must select an API key from a paid GCP project. 
                    Check the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">billing documentation</a> for details.
                  </p>
                  <button 
                    onClick={handleSelectKey}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-bold transition-all"
                  >
                    Select API Key
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="glass p-8 rounded-[2rem] space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe the ${activeTab} you want to create...`}
              className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleEnhance}
                disabled={isEnhancing || !prompt}
                className="flex-1 px-8 py-4 glass hover:bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isEnhancing ? 'Magic in progress...' : '✨ Enhance Prompt'}
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex-1 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl shadow-indigo-500/20"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {activeTab === 'video' ? 'Generating Video (may take 1-2 mins)...' : 'Generating Image...'}
                  </span>
                ) : `Generate ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest">Inspiration</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "Cyberpunk street market in Tokyo at night, rainy reflections, neon signs",
                "Cinematic shot of an astronaut riding a horse on Mars, dust storm background",
                "Ultra-realistic portrait of a mystical forest spirit made of autumn leaves",
              ].map((ex, i) => (
                <button 
                  key={i} 
                  onClick={() => setPrompt(ex)}
                  className="px-4 py-2 glass hover:bg-white/10 rounded-xl text-xs text-white/60 text-left transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="glass rounded-[2rem] overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold">Output Preview</h3>
            {resultUrl && (
              <a href={resultUrl} download={`nexus-${activeTab}.${activeTab === 'video' ? 'mp4' : 'png'}`} className="text-indigo-400 text-sm hover:underline font-bold">Download</a>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center p-6 bg-black/40">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-white/40">Our neural networks are dreaming...</p>
                {activeTab === 'video' && <p className="text-[10px] text-white/20 px-8 italic">Video generation processes high volumes of data, please stay on this page.</p>}
              </div>
            ) : resultUrl ? (
              activeTab === 'image' ? (
                <img src={resultUrl} alt="Generated" className="w-full h-auto rounded-xl shadow-2xl" />
              ) : (
                <video src={resultUrl} controls className="w-full h-auto rounded-xl shadow-2xl" autoPlay loop />
              )
            ) : (
              <div className="text-center opacity-20">
                <div className="text-6xl mb-4">{activeTab === 'video' ? '🎞️' : '🖼️'}</div>
                <p>No generation yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
