import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BASE_PATH = path.resolve('static/data');

const markdownFilter = (file) => {
  return typeof file === 'string' ? file.endsWith('.md') : false;
};

const projectCategoriesDir = path.resolve(`${BASE_PATH}/project-categories`);
const projectCategoriesFiles = fs.readdirSync(projectCategoriesDir).filter(markdownFilter);

const projectCategories = {};

projectCategoriesFiles.forEach((file) => {
  const fileContent = fs.readFileSync(path.join(projectCategoriesDir, file), 'utf-8');
  const { data, content } = matter(fileContent);
  const htmlContent = marked(content);

  const projectCategoryType = file.replace('.md', '');

  projectCategories[projectCategoryType] = {
    ...data,
    description: htmlContent,
    projects: []
  };
});

[...Object.keys(projectCategories)].forEach((type) => {
  const projectDir = path.resolve(`${BASE_PATH}/projects/${type}`);
  const projectFiles = fs.readdirSync(projectDir, { recursive: true }).filter(markdownFilter);

  return projectFiles.map((file) => {
    const fileContent = fs.readFileSync(path.join(projectDir, file), 'utf-8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked.parse(content);

    const project = {
      ...data,
      description: htmlContent
    };

    projectCategories[type].projects.push(project);
  });
});

fs.writeFileSync(path.resolve('src/lib/projectCategories.json'), JSON.stringify(projectCategories));
