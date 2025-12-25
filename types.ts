
export type SectionId = 'hero' | 'features' | 'workflow' | 'pricing' | 'cta';

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  published: boolean;
  sections: SectionId[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  published: boolean;
  createdAt: string;
}

export interface SiteConfig {
  name: string;
  primaryColor: string;
  accentColor: string;
  theme: 'dark' | 'light';
  fontFamily: string;
  logoUrl: string;
  easypaisaNumber: string;
  easypaisaName: string;
  bankDetails: string;
  isHeroEnabled: boolean;
  isFeaturesEnabled: boolean;
  isWorkflowEnabled: boolean;
}

export interface CMSData {
  config: SiteConfig;
  pages: PageContent[];
  posts: Post[];
  media: string[];
}

export interface GeneratedContent {
  id: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  createdAt: string;
}
