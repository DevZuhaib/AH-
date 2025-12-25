
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSData, SiteConfig, Post, PageContent } from './types';
import { INITIAL_CMS_DATA } from './constants';

interface CMSContextType {
  data: CMSData;
  updateConfig: (config: SiteConfig) => void;
  updatePage: (page: PageContent) => void;
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  updatePost: (post: Post) => void;
  addMedia: (url: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    const saved = localStorage.getItem('nexus_cms_data');
    return saved ? JSON.parse(saved) : INITIAL_CMS_DATA;
  });

  useEffect(() => {
    localStorage.setItem('nexus_cms_data', JSON.stringify(data));
  }, [data]);

  const updateConfig = (config: SiteConfig) => {
    setData(prev => ({ ...prev, config }));
  };

  const updatePage = (page: PageContent) => {
    setData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === page.id ? page : p)
    }));
  };

  const addPost = (post: Post) => {
    setData(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  };

  const deletePost = (id: string) => {
    setData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
  };

  const updatePost = (post: Post) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === post.id ? post : p)
    }));
  };

  const addMedia = (url: string) => {
    setData(prev => ({ ...prev, media: [url, ...prev.media] }));
  };

  return (
    <CMSContext.Provider value={{ data, updateConfig, updatePage, addPost, deletePost, updatePost, addMedia }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};
