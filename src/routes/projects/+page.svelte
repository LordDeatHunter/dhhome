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

<main id="projects" class="bg-projects flex flex-col items-center justify-center gap-0 overflow-x-hidden">
  <div class="page-content">
    <h1 class="fade-in text-4xl font-[960] sm:text-5xl md:text-6xl lg:text-7xl">Projects</h1>
    <NavBar />
    <div class="divider-h slower-fade-in"></div>
    <div class="slower-fade-in flex w-full max-w-[960px] flex-col gap-8">
      {#each Object.values(data) as projectCategory, i}
        <ProjectCategory {projectCategory} />
        {#if i !== Object.values(data).length - 1}
          <div class="divider-h slower-fade-in"></div>
        {/if}
      {/each}
    </div>
  </div>
  <ProjectModal />
</main>
