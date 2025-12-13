<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  interface Props {
    threshold?: number;
  }

  let { threshold = 300 }: Props = $props();

  let showButton = $state(false);
  let isHiding = $state(false);

  const handleScroll = () => {
    const shouldShow = window.scrollY > threshold;

    if (shouldShow && !showButton) {
      isHiding = false;
      showButton = true;
    } else if (!shouldShow && showButton && !isHiding) {
      isHiding = true;
      setTimeout(() => {
        showButton = false;
        isHiding = false;
      }, 300); // Match animation duration
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

{#if showButton}
  <button
    class="scroll-to-top {isHiding ? 'hide' : ''}"
    onclick={scrollToTop}
    aria-label="Scroll to top"
  >
    <Icon icon="pixelarticons:arrow-up" class="h-7 w-7" />
  </button>
{/if}
