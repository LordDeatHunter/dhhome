import { writable } from 'svelte/store';
import type { Project } from '$lib/types';

export const selectedProject = writable<Project | null>(null);
