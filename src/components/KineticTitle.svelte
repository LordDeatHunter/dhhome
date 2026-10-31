<script lang="ts">
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<p class="kinetic-title text-5xl font-[960] sm:text-6xl md:text-7xl" aria-label={text}>
  {#each text.split('') as letter, i}
    <span class="letter" style:--i={i} aria-hidden="true">{letter}</span>
  {/each}
</p>

<style>
  .kinetic-title {
    display: flex;
    perspective: 600px;
    letter-spacing: 0.02em;
  }

  .letter {
    display: inline-block;
    cursor: default;
    animation: letterIn 0.8s calc(0.45s + var(--i) * 70ms) cubic-bezier(0.22, 1.2, 0.36, 1) backwards;
    transition:
      transform 0.25s ease-out,
      text-shadow 0.25s ease-out;
  }

  .letter:hover {
    transform: translateY(-0.12em) scale(1.12);
    text-shadow: 0 6px 14px rgba(74, 13, 55, 0.5);
  }

  @keyframes letterIn {
    from {
      opacity: 0;
      transform: translateY(0.6em) rotateX(-80deg) scale(0.6);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: none;
      filter: blur(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .letter {
      animation: none;
    }
  }
</style>
