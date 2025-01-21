<script lang="ts">
  import { Technologies } from '$lib/types';
  import Icon from '@iconify/svelte';

  interface Props {
    technologies: Array<keyof typeof Technologies>;
  }

  let { technologies }: Props = $props();

  let collapsed = $state(true);

  const setCollapsed = (value: boolean) => (event: MouseEvent) => {
    event.stopPropagation();
    collapsed = value;
  };
</script>

{#if collapsed}
  <button onclick={setCollapsed(false)} class="technologies-button">
    Technologies
    <Icon icon="pixelarticons:chevron-down" class="h-8 w-8" />
  </button>
{:else}
  <button onclick={setCollapsed(true)} class="technologies-button">
    Technologies
    <Icon icon="pixelarticons:chevron-up" class="h-8 w-8" />
  </button>
  <div class="flex flex-wrap gap-1">
    {#each technologies as technology}
      <span class="technology">
        {Object.keys(Technologies).includes(technology) ? Technologies[technology] : technology}
      </span>
    {/each}
  </div>
{/if}
