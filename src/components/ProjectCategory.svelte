<script lang="ts">
  import { blur } from 'svelte/transition';
  import ProjectCard from '$components/ProjectCard.svelte';
  import type { ProjectCategory } from '$lib/types';
  import Icon from '@iconify/svelte';

  export let projectCategory: ProjectCategory;
  let showProjects = true;
</script>

<div class="project-container">
  <h2>{projectCategory.title}</h2>
  {@html projectCategory.description}
  <button
    on:click={() => (showProjects = !showProjects)}
    class="flex items-center justify-center gap-2 text-2xl"
  >
    {showProjects
      ? `Hide ${projectCategory.projects.length} Projects`
      : `Show ${projectCategory.projects.length} Projects`}
    <Icon
      icon={showProjects ? 'pixelarticons:chevron-up' : 'pixelarticons:chevron-down'}
      class="h-8 w-8"
    />
  </button>
  {#if showProjects}
    <div class="project-cards" out:blur={{ duration: 300 }} in:blur={{ duration: 300 }}>
      {#each projectCategory.projects as project}
        <ProjectCard {project} />
      {/each}
    </div>
  {/if}
</div>
