import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const BASE_PATH = path.resolve('static/data');

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const markdownFilter = (file) => {
  return typeof file === 'string' ? file.endsWith('.md') : false;
};

const projectCategoriesDir = path.resolve(`${BASE_PATH}/project-categories`);
const projectCategoriesFiles = fs.readdirSync(projectCategoriesDir).filter(markdownFilter);

const projectCategories = {};

projectCategoriesFiles.forEach((file) => {
  const fileContent = fs.readFileSync(path.join(projectCategoriesDir, file), 'utf-8');
  const { data, content } = matter(fileContent);

  const htmlContent = marked.parse(content);

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
      technologies: data.technologies.sort(),
      description: htmlContent
    };

    projectCategories[type].projects.push(project);
  });
});

fs.writeFileSync(path.resolve('src/lib/projectCategories.json'), JSON.stringify(projectCategories));
