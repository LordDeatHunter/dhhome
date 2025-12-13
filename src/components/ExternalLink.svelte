<script lang="ts">
  import Icon from '@iconify/svelte';

  interface Props {
    url: any;
    icon?: string;
    children?: import('svelte').Snippet;
  }

  let { url, icon = 'pixelarticons:external-link', children }: Props = $props();

  const iconOnly = !children;
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="button flex w-fit items-center gap-1 {iconOnly ? 'icon-only' : ''}"
  onclick={(e) => e.stopPropagation()}
>
  {@render children?.()}
  <Icon {icon} class={iconOnly ? 'h-6 w-6' : 'h-8 w-8'} />
</a>
