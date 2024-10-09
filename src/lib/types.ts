export const Technologies = {
  AspDotNet: 'ASP.NET',
  CSharp: 'C#',
  GDScript: 'GDScript',
  Godot: 'Godot',
  Java: 'Java',
  JavaScript: 'JavaScript',
  MonoGame: 'MonoGame',
  Nuxt: 'Nuxt',
  Supabase: 'Supabase',
  SvelteKit: 'SvelteKit',
  TailwindCss: 'TailwindCSS',
  TypeScript: 'TypeScript'
} as const;

export interface Project {
  title: string;
  summary: string;
  description?: string;
  img: string;
  technologies: Array<keyof typeof Technologies>;
  link?: string;
  source?: string;
}

export interface ProjectCategory {
  title: string;
  description: string;
  projects: Project[];
}
