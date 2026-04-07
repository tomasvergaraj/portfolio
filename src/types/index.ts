export interface DemoCredential {
  email: string;
  password: string;
  role: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  image: string;
  gallery: string[];
  demoUrl: string;
  repoUrl: string;
  category: string;
  demoCredentials?: DemoCredential[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
