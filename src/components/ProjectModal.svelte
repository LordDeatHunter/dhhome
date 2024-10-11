<script lang="ts">
  import { selectedProject } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import ExternalLink from '$components/ExternalLink.svelte';

  let dialog: HTMLDialogElement;

  $: if (dialog && $selectedProject) {
    dialog.showModal();
  } else {
    dialog?.close();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => selectedProject.set(null)}
  on:click|self={() => selectedProject.set(null)}
  class="z-2"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="project-dialog" on:click|stopPropagation>
    <button class="close-button" on:click={() => selectedProject.set(null)}>
      <Icon icon="pixelarticons:close" class="h-8 w-8" />
    </button>
    <div class="flex h-40 w-40 items-center justify-center">
      <img src={$selectedProject?.img} alt={$selectedProject?.title} class="project-img-preview" />
    </div>
    <h2>{$selectedProject?.title}</h2>
    <div class="divider-h" />
    <div class="project-overview">
      {@html $selectedProject?.description}
    </div>
    {#if $selectedProject?.link || $selectedProject?.source}
      <div class="divider-h" />
      <div class="flex gap-8">
        {#if $selectedProject?.link}
          <ExternalLink url={$selectedProject?.link}>View Project</ExternalLink>
        {/if}
        {#if $selectedProject?.source}
          <ExternalLink icon="pixelarticons:code" url={$selectedProject?.source}>
            View Source
          </ExternalLink>
        {/if}
      </div>
    {/if}
  </div>
</dialog>
<div
  class="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out"
  style="display: {$selectedProject ? 'block' : 'none'}"
/>
