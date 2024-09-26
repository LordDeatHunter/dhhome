import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Project, ProjectCategory } from '$lib/types';

const markdownFilter = (file: string | Buffer): boolean => {
  return typeof file === 'string' ? file.endsWith('.md') : false;
};

export async function load() {
  const projectCategoriesDir = path.resolve('src/lib/project-categories');
  const projectCategoriesFiles = fs.readdirSync(projectCategoriesDir).filter(markdownFilter);

  const projectCategories: Record<string, ProjectCategory> = {};

  projectCategoriesFiles.forEach((file) => {
    const fileContent = fs.readFileSync(path.join(projectCategoriesDir, file), 'utf-8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked.parse(content) as string;

    const projectCategoryType = file.replace('.md', '');

    projectCategories[projectCategoryType] = {
      ...(data as { title: string }),
      description: htmlContent,
      projects: []
    };
  });

  [...Object.keys(projectCategories)].forEach((type) => {
    const projectDir = path.resolve(`src/lib/projects/${type}`);
    const projectFiles = fs.readdirSync(projectDir, { recursive: true }).filter(markdownFilter);

    return projectFiles.map((file) => {
      const fileContent = fs.readFileSync(path.join(projectDir, file as string), 'utf-8');
      const { data, content } = matter(fileContent);
      const htmlContent = marked.parse(content) as string;

      const project: Project = {
        ...(data as Exclude<Project, 'description'>),
        description: htmlContent
      };

      projectCategories[type].projects.push(project);
    });
  });

  return projectCategories;
}
