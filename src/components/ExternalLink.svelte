<script lang="ts">
  import Icon from '@iconify/svelte';

  export let url;
  export let icon = 'pixelarticons:external-link';
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="button flex w-fit items-center gap-1"
  on:click|stopPropagation
>
  <slot />
  <Icon {icon} class="h-8 w-8" />
</a>
