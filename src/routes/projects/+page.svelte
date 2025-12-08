<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import ProjectModal from '$components/ProjectModal.svelte';
  import ProjectCategory from '$components/ProjectCategory.svelte';
  import type { ProjectCategory as ProjectCategoryType } from '$lib/types';

  interface Props {
    data: ProjectCategoryType;
  }

  let { data }: Props = $props();
</script>

<main
  id="projects"
  class="bg-projects flex flex-col items-center justify-center gap-0 overflow-x-hidden"
>
  <div class="page-content">
    <h1 class="fade-in text-4xl font-[960] sm:text-5xl md:text-6xl lg:text-7xl">Projects</h1>
    <p class="fade-in text-center text-lg opacity-80 sm:text-xl">
      Different projects I've worked on throughout the years
    </p>
    <NavBar />
  </div>
  <div class="projects-container">
    {#each Object.values(data) as projectCategory, i}
      <ProjectCategory {projectCategory} />
    {/each}
  </div>
  <ProjectModal />
</main>
