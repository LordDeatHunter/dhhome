<script lang="ts">
  import Icon from '@iconify/svelte';

  interface Props {
    url: any;
    icon?: string;
    children?: import('svelte').Snippet;
  }

  let { url, icon = 'pixelarticons:external-link', children }: Props = $props();
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="button flex w-fit items-center gap-1"
  onclick={(e) => e.stopPropagation()}
>
  {@render children?.()}
  <Icon {icon} class="h-8 w-8" />
</a>
