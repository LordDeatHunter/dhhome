<script lang="ts">
  import Icon from '@iconify/svelte';

  interface Props {
    text: string;
    mainIcon: string;
    action: () => void;
    actionIcon: string;
    actionText: string;
    animationDelay?: string;
  }

  let { text, mainIcon, action, actionIcon, actionText, animationDelay }: Props = $props();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      action();
    }
  };
</script>

<div
  class="contact-link slide-up"
  style="animation-delay: {animationDelay ? animationDelay : '0s'};"
>
  <div class="contact-main">
    <div class="contact-icon">
      <Icon icon={mainIcon} class="h-8 w-8" />
    </div>
    <h2 class="contact-text text-xl font-[960] sm:text-2xl">{text}</h2>
  </div>
  <div
    onclick={action}
    onkeydown={handleKeyDown}
    class="contact-action"
    aria-label={actionText}
    tabindex="0"
    role="button"
  >
    <Icon icon={actionIcon} class="h-5 w-5" />
    <span class="contact-action-text">{actionText}</span>
  </div>
</div>
