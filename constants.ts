
import { CMSData, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  name: 'NexusAI',
  primaryColor: '#6366f1', // Indigo 500
  accentColor: '#ec4899', // Pink 500
  theme: 'dark',
  fontFamily: 'Plus+Jakarta+Sans',
  logoUrl: 'https://picsum.photos/200/200',
  easypaisaNumber: '0300-1234567',
  easypaisaName: 'Nexus Studio PVT',
  bankDetails: 'HBL Bank - 00112233445566',
  isHeroEnabled: true,
  isFeaturesEnabled: true,
  isWorkflowEnabled: true,
};

export const INITIAL_CMS_DATA: CMSData = {
  config: INITIAL_CONFIG,
  pages: [
    {
      id: '1',
      title: 'Home',
      slug: 'home',
      metaTitle: 'NexusAI - Premier AI Image & Video Studio',
      metaDescription: 'Generate hyper-realistic images and cinematic videos with NexusAI.',
      content: 'Welcome to the future of creativity.',
      published: true,
      sections: ['hero', 'features', 'workflow', 'cta'],
    }
  ],
  posts: [
    {
      id: '1',
      title: 'The Future of AI Video',
      slug: 'future-of-ai-video',
      excerpt: 'Explore how Veo 3.1 is changing the landscape of digital filmmaking.',
      content: 'Digital filmmaking is undergoing a massive shift...',
      category: 'Technology',
      tags: ['AI', 'Video', 'Future'],
      image: 'https://picsum.photos/800/400?random=1',
      published: true,
      createdAt: new Date().toISOString(),
    }
  ],
  media: [
    'https://picsum.photos/400/300?random=10',
    'https://picsum.photos/400/300?random=11',
    'https://picsum.photos/400/300?random=12',
  ],
};
