import projectCategories from '$lib/projectCategories.json';
import type { Project } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { projectId } = params;

  for (const category of Object.values(projectCategories)) {
    const project = category.projects.find((p: any) => p.id === projectId) as Project | undefined;
    if (project) {
      return { project };
    }
  }

  throw error(404, 'Project not found');
};
