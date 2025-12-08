<script lang="ts">
  interface Props {
    href: string;
    imgSrc: string;
    title: string;
    summary: string;
    animationDelay?: string;
  }

  let { href, imgSrc, title, summary, animationDelay }: Props = $props();
</script>

<a {href} class="slide-up" style="animation-delay: {animationDelay ? animationDelay : '0s'};">
  <div class="hobby-link">
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
