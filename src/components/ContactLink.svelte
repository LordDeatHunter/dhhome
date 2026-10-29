<script lang="ts">
  import Icon from '@iconify/svelte';

  interface Props {
    text: string;
    mainIcon: string;
    action?: () => void;
    url?: string;
    actionIcon: string;
    actionText: string;
    animationDelay?: string;
  }

  let { text, mainIcon, action, url, actionIcon, actionText, animationDelay }: Props = $props();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      action?.();
    }
  };
</script>

<svelte:element
  this={url ? 'a' : 'div'}
  class="contact-link slide-up"
  style="animation-delay: {animationDelay ? animationDelay : '0s'};"
  href={url}
  target={url ? '_blank' : undefined}
  rel={url ? 'noopener noreferrer' : undefined}
  role={url ? undefined : 'button'}
  tabindex={url ? undefined : 0}
  aria-label={actionText}
  onclick={url ? undefined : action}
  onkeydown={url ? undefined : handleKeyDown}
>
  <div class="contact-main">
    <div class="contact-icon">
      <Icon icon={mainIcon} class="h-8 w-8" />
    </div>
    <h2 class="contact-text text-xl font-[960] sm:text-2xl">{text}</h2>
  </div>
  <div class="contact-action">
    <Icon icon={actionIcon} class="h-5 w-5" />
    <span class="contact-action-text">{actionText}</span>
  </div>
</svelte:element>
