<script lang="ts">
  import type { Technologies } from '$lib/types';
  import Icon from '@iconify/svelte';

  export let technologies: Technologies[];

  let collapsed = true;
</script>

{#if collapsed}
  <button on:click|stopPropagation={() => (collapsed = false)} class="technologies-button">
    Technologies
    <Icon icon="pixelarticons:chevron-down" class="h-8 w-8" />
  </button>
{:else}
  <button on:click|stopPropagation={() => (collapsed = true)} class="technologies-button">
    Technologies
    <Icon icon="pixelarticons:chevron-up" class="h-8 w-8" />
  </button>
  <div class="flex flex-wrap gap-1">
    {#each technologies as technology}
      <span class="technology">
        {technology}
      </span>
    {/each}
  </div>
{/if}
