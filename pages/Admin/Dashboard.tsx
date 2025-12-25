
import React, { useState } from 'react';
import { useCMS } from '../../CMSContext';
import { SiteConfig, Post, PageContent } from '../../types';

const AdminDashboard: React.FC = () => {
  const { data, updateConfig, updatePost, addPost, deletePost, updatePage } = useCMS();
  const [activeTab, setActiveTab] = useState<'config' | 'pages' | 'posts' | 'media'>('config');

  const [localConfig, setLocalConfig] = useState<SiteConfig>(data.config);

  const handleSaveConfig = () => {
    updateConfig(localConfig);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col gap-12 fixed h-full bg-[#080808] z-50">
        <div>
          <h1 className="text-2xl font-bold font-heading">Nexus CMS</h1>
          <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Admin Control Center</p>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: 'config', name: 'Site Settings', icon: '⚙️' },
            { id: 'pages', name: 'Pages & Layout', icon: '📄' },
            { id: 'posts', name: 'Blog Posts', icon: '✍️' },
            { id: 'media', name: 'Media Library', icon: '🖼️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-left transition-all ${activeTab === tab.id ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-white/50'}`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <a href="/#" className="text-xs text-white/20 hover:text-white transition-colors underline">Back to Website</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'config' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-bold font-heading">Site Settings</h2>
                  <p className="text-white/40">Manage global configurations and styling.</p>
                </div>
                <button 
                  onClick={handleSaveConfig}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold shadow-xl shadow-indigo-600/20"
                >
                  Save Changes
                </button>
              </header>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-3xl space-y-6">
                  <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">General Branding</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40">Site Name</label>
                      <input 
                        type="text" 
                        value={localConfig.name}
                        onChange={e => setLocalConfig({...localConfig, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40">Logo URL</label>
                      <input 
                        type="text" 
                        value={localConfig.logoUrl}
                        onChange={e => setLocalConfig({...localConfig, logoUrl: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500" 
                      />
                    </div>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl space-y-6">
                  <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Section Visibility</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Hero Section', key: 'isHeroEnabled' },
                      { label: 'Features Section', key: 'isFeaturesEnabled' },
                      { label: 'Workflow Section', key: 'isWorkflowEnabled' },
                    ].map(s => (
                      <div key={s.key} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                        <span className="font-bold">{s.label}</span>
                        <input 
                          type="checkbox" 
                          checked={(localConfig as any)[s.key]}
                          onChange={e => setLocalConfig({...localConfig, [s.key]: e.target.checked})}
                          className="w-6 h-6 rounded-lg accent-indigo-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl space-y-6 col-span-2">
                  <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Payment Configuration (Pakistan)</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40">EasyPaisa Number</label>
                        <input 
                          type="text" 
                          value={localConfig.easypaisaNumber}
                          onChange={e => setLocalConfig({...localConfig, easypaisaNumber: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40">Account Name</label>
                        <input 
                          type="text" 
                          value={localConfig.easypaisaName}
                          onChange={e => setLocalConfig({...localConfig, easypaisaName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40">Bank Details / Instructions</label>
                      <textarea 
                        value={localConfig.bankDetails}
                        onChange={e => setLocalConfig({...localConfig, bankDetails: e.target.value})}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500 resize-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-bold font-heading">Blog Posts</h2>
                  <p className="text-white/40">Create and manage your articles.</p>
                </div>
                <button 
                  onClick={() => {
                    const newPost: Post = {
                      id: Math.random().toString(),
                      title: 'New Article',
                      slug: 'new-article-' + Date.now(),
                      excerpt: 'Brief overview...',
                      content: 'Start writing...',
                      category: 'Uncategorized',
                      tags: [],
                      image: 'https://picsum.photos/800/400',
                      published: true,
                      createdAt: new Date().toISOString()
                    };
                    addPost(newPost);
                  }}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold shadow-xl shadow-indigo-600/20"
                >
                  + Add Post
                </button>
              </header>

              <div className="space-y-4">
                {data.posts.map(post => (
                  <div key={post.id} className="glass p-6 rounded-3xl flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <img src={post.image} className="w-20 h-20 rounded-2xl object-cover" />
                      <div>
                        <h4 className="font-bold text-lg">{post.title}</h4>
                        <p className="text-white/30 text-xs">/{post.slug} • {post.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <header>
                  <h2 className="text-4xl font-bold font-heading">Pages & SEO</h2>
                  <p className="text-white/40">Manage page structure and search engine visibility.</p>
                </header>

                <div className="space-y-6">
                  {data.pages.map(page => (
                    <div key={page.id} className="glass p-8 rounded-3xl space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <h4 className="text-xl font-bold">{page.title} Page</h4>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold uppercase tracking-widest">Published</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-white/40">Meta Title</label>
                              <input 
                                type="text" 
                                value={page.metaTitle}
                                onChange={e => updatePage({...page, metaTitle: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-white/40">Meta Description</label>
                              <textarea 
                                value={page.metaDescription}
                                onChange={e => updatePage({...page, metaDescription: e.target.value})}
                                className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 resize-none" 
                              />
                            </div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-xs font-bold text-white/40">Active Sections</label>
                            <div className="flex flex-wrap gap-2">
                              {['hero', 'features', 'workflow', 'pricing', 'cta'].map(sec => (
                                <button 
                                  key={sec}
                                  onClick={() => {
                                    const current = page.sections || [];
                                    const next = current.includes(sec as any) 
                                      ? current.filter(s => s !== sec)
                                      : [...current, sec as any];
                                    updatePage({...page, sections: next});
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${page.sections?.includes(sec as any) ? 'bg-indigo-600' : 'bg-white/5 hover:bg-white/10 text-white/40'}`}
                                >
                                  {sec.toUpperCase()}
                                </button>
                              ))}
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'media' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold font-heading">Media Library</h2>
                    <p className="text-white/40">Manage your assets and uploads.</p>
                  </div>
                  <label className="px-8 py-3 bg-white text-black rounded-xl font-bold cursor-pointer hover:bg-white/90">
                    + Upload Media
                    <input type="file" className="hidden" />
                  </label>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data.media.map((url, i) => (
                    <div key={i} className="aspect-square glass rounded-2xl overflow-hidden group relative">
                      <img src={url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <button className="text-red-400 font-bold">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
