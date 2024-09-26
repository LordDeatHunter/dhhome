<script lang="ts">
  import '../../style.css';
  import NavBar from '../NavBar.svelte';
  import ProjectModal from '../../components/ProjectModal.svelte';
  import ProjectCategory from './ProjectCategory.svelte';

  export let data;
</script>

<main id="projects" class="bg-projects flex flex-col items-center justify-center gap-0">
  <div class="grow-in flex flex-col items-center justify-center gap-4 pt-12">
    <h1 class="fade-in text-7xl font-[960]">Projects</h1>
    <NavBar />
    <div class="divider-h slower-fade-in" />
    <div class="slower-fade-in flex max-w-[960px] flex-col gap-8">
      {#each Object.values(data) as projectCategory, i}
        <ProjectCategory {projectCategory} />
        {#if i !== Object.values(data).length - 1}
          <div class="divider-h slower-fade-in" />
        {/if}
      {/each}
    </div>
  </div>
  <ProjectModal />
</main>
