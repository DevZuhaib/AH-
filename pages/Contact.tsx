
import React from 'react';
import { useCMS } from '../CMSContext';

const Contact: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold font-heading">Get in Touch</h1>
            <p className="text-white/50 text-lg">Have a project in mind or need custom AI training? Let's talk.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/40 uppercase">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-indigo-500 outline-none" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/40 uppercase">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-indigo-500 outline-none" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/40 uppercase">Message</label>
              <textarea className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 focus:border-indigo-500 outline-none resize-none" placeholder="How can we help?" />
            </div>
            <button className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-lg">
              Send Message
            </button>
          </form>
        </div>

        {/* Payments Panel */}
        <div className="space-y-8">
          <div className="glass p-10 rounded-[2.5rem] space-y-8 border-indigo-500/20 shadow-2xl">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-heading">Secure Payments</h2>
              <p className="text-white/50">For local clients in Pakistan, we support instant bank transfers and mobile wallets.</p>
            </div>

            <div className="space-y-6">
              {/* EasyPaisa */}
              <div className="flex items-center gap-6 p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2">
                   <img src="https://picsum.photos/100/100?random=100" alt="EasyPaisa" className="rounded-lg" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400">EasyPaisa</h4>
                  <p className="text-2xl font-black">{data.config.easypaisaNumber}</p>
                  <p className="text-xs text-white/40">Account Name: {data.config.easypaisaName}</p>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="flex items-center gap-6 p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 text-indigo-900 text-3xl">🏦</div>
                <div>
                  <h4 className="font-bold text-indigo-400">Bank Transfer</h4>
                  <p className="text-sm font-medium">{data.config.bankDetails}</p>
                  <p className="text-xs text-white/40 mt-1">Please share receipt via email or WhatsApp after transfer.</p>
                </div>
              </div>
            </div>

            <div className="p-6 glass rounded-2xl border-white/10 text-center space-y-4">
              <h4 className="text-sm font-bold text-white/40 uppercase">Need Help?</h4>
              <p className="text-sm">WhatsApp us at: <span className="font-bold text-indigo-400">0311-9876543</span></p>
              <div className="flex justify-center gap-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">FB</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">IG</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">TW</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
