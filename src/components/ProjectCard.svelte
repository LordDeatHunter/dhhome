<script lang="ts">
  import { selectedProject } from '$lib/stores';
  import type { Project } from '$lib/types';
  import ExternalLink from '$components/ExternalLink.svelte';
  import Technologies from '$components/Technologies.svelte';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
  class="project-card flex flex-col items-center justify-between gap-8"
  onclick={() => selectedProject.set(project)}
>
  <div class="flex flex-col justify-between gap-2">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="flex h-40 w-40 items-center justify-center">
        <img src={project.img} alt={project.title} class="project-img-preview" />
      </div>
      <div class="divider-h"></div>
      <h2 class="title">{project.title}</h2>
      <Technologies technologies={project.technologies} />
    </div>
    <p class="summary text-center">{project.summary}</p>
  </div>
  {#if project.link || project.source}
    <div class="flex gap-4">
      {#if project.link}
        <ExternalLink url={project.link} />
      {/if}
      {#if project.source}
        <ExternalLink icon="pixelarticons:code" url={project.source} />
      {/if}
    </div>
  {/if}
</div>
