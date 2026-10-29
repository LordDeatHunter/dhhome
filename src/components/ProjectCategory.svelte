<script lang="ts">
  import { slide } from 'svelte/transition';
  import ProjectCard from '$components/ProjectCard.svelte';
  import type { ProjectCategory } from '$lib/types';
  import Icon from '@iconify/svelte';

  interface Props {
    projectCategory: ProjectCategory;
  }

  let { projectCategory }: Props = $props();
  let showProjects = $state(true);
</script>

<div class="project-container">
  <h2>{projectCategory.title}</h2>
  {@html projectCategory.description}
  <button
    onclick={() => (showProjects = !showProjects)}
    aria-expanded={showProjects}
    class="project-toggle"
  >
    <span>{projectCategory.projects.length} Projects</span>
    <Icon
      icon="pixelarticons:chevron-down"
      class="project-toggle-icon h-6 w-6 {showProjects ? 'open' : ''}"
    />
  </button>
  {#if showProjects}
    <div class="project-cards" transition:slide={{ duration: 300 }}>
      {#each projectCategory.projects as project}
        <ProjectCard {project} />
      {/each}
    </div>
  {/if}
</div>
