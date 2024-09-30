<script lang="ts">
  import Icon from '@iconify/svelte';

  export let text: string;
  export let mainIcon: string;
  export let action: () => void;
  export let actionIcon: string;
  export let actionText: string;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      action();
    }
  };
</script>

<div class="contact-link">
  <div class="contact-main">
    <Icon icon={mainIcon} class="h-8 w-8" />
    <h2 class="text-2xl font-[960]">{text}</h2>
  </div>
  <div
    on:click={action}
    on:keydown={handleKeyDown}
    class="contact-action"
    aria-label={actionText}
    tabindex="0"
    role="button"
  >
    <Icon icon={actionIcon} class="h-6 w-6" />
    {actionText}
  </div>
</div>
