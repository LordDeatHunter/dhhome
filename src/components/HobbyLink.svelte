<script lang="ts">
  import Icon from '@iconify/svelte';

  interface Props {
    href: string;
    imgSrc: string;
    title: string;
    summary: string;
    animationDelay?: string;
    external?: boolean;
  }

  let { href, imgSrc, title, summary, animationDelay, external }: Props = $props();
</script>

<a
  {href}
  class="slide-up"
  style="animation-delay: {animationDelay ? animationDelay : '0s'};"
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
>
  <div class="hobby-link">
    {#if external}
      <span class="hobby-external-icon">
        <Icon icon="pixelarticons:external-link" width="32" height="32" />
      </span>
    {/if}
    <div class="hobby-img-container flex h-40 w-40 items-center justify-center">
      <img
        src={imgSrc}
        alt={title}
        class="hobby-img-preview rounded-full"
        width="160"
        height="160"
      />
    </div>
    <div class="flex flex-col items-center justify-center gap-2">
      <h2 class="title">{title}</h2>
      <p class="summary">{summary}</p>
    </div>
  </div>
</a>
