<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
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
  <PageHeader title="Projects" subtitle="Different projects I've worked on throughout the years" />
  <div class="projects-container">
    {#each Object.values(data) as projectCategory, i}
      <ProjectCategory {projectCategory} />
    {/each}
  </div>
  <ProjectModal />
</main>
