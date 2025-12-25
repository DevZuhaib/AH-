
import React, { useState } from 'react';

const FaceSwap: React.FC = () => {
  const [sourceImg, setSourceImg] = useState<string | null>(null);
  const [targetImg, setTargetImg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (type: 'source' | 'target', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'source') setSourceImg(url);
      else setTargetImg(url);
    }
  };

  const handleSwap = () => {
    if (!sourceImg || !targetImg) return;
    setIsProcessing(true);
    // Simulate AI Processing
    setTimeout(() => {
      setResult(targetImg); // In a real app, this would be the output from an API
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-bold font-heading">AI Face Swap</h1>
        <p className="text-white/50">Seamlessly swap faces in images and videos with pro-grade precision.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Source Image */}
        <div className="space-y-6">
          <label className="block text-sm font-bold text-white/40 uppercase tracking-widest">Source Face</label>
          <div className="glass aspect-square rounded-[2rem] overflow-hidden relative group border-2 border-dashed border-white/10 hover:border-indigo-500/50 transition-all">
            {sourceImg ? (
              <img src={sourceImg} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="text-4xl">👤</div>
                <p className="text-sm text-white/40">Upload the face you want to use</p>
              </div>
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => handleFile('source', e)}
            />
          </div>
        </div>

        {/* Target Image */}
        <div className="space-y-6">
          <label className="block text-sm font-bold text-white/40 uppercase tracking-widest">Target Image/Video</label>
          <div className="glass aspect-square rounded-[2rem] overflow-hidden relative group border-2 border-dashed border-white/10 hover:border-indigo-500/50 transition-all">
            {targetImg ? (
              <img src={targetImg} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="text-4xl">🖼️</div>
                <p className="text-sm text-white/40">Upload the media to swap into</p>
              </div>
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => handleFile('target', e)}
            />
          </div>
        </div>

        {/* Control & Result */}
        <div className="flex flex-col justify-center gap-8">
          <div className="glass p-8 rounded-[2rem] space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold">Ready to process?</h4>
              <p className="text-sm text-white/40">Our AI will detect the faces automatically and blend them naturally.</p>
            </div>
            <button 
              onClick={handleSwap}
              disabled={!sourceImg || !targetImg || isProcessing}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20"
            >
              {isProcessing ? 'Processing...' : 'Start Face Swap'}
            </button>
          </div>

          {result && !isProcessing && (
            <div className="glass p-4 rounded-[2rem] animate-in slide-in-from-bottom-4 duration-500">
              <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
                <img src={result} className="w-full h-full object-cover blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="glass p-4 rounded-xl text-xs font-bold">PRO FEATURE REQUIRED</div>
                </div>
              </div>
              <p className="text-center text-xs text-white/30 italic">Upgrade to Pro to view and download full result.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceSwap;
