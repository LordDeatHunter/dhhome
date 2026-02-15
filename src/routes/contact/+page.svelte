<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
  import ContactLink from '$components/ContactLink.svelte';
  import { contactLinks } from '$lib/contacts';
  import type { CopiableContactLink } from '$lib/contacts';

  let copiedStates = $state<Record<string, boolean>>({});

  const copyToClipboard = (link: CopiableContactLink) => {
    navigator.clipboard.writeText(link.copyText);
    copiedStates[link.text] = true;
    setTimeout(() => {
      copiedStates[link.text] = false;
    }, 2000);
  };

  const getContactLinkProps = (link: (typeof contactLinks)[0]) => {
    switch (link.type) {
      case 'copiable':
        return {
          text: link.text,
          mainIcon: link.mainIcon,
          actionIcon: link.actionIcon,
          actionText: copiedStates[link.text] ? link.copiedText || 'Copied!' : link.actionText,
          action: () => copyToClipboard(link)
        };
      default:
        return {
          text: link.text,
          mainIcon: link.mainIcon,
          actionIcon: link.actionIcon,
          actionText: link.actionText,
          url: link.url
        };
    }
  };
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0 overflow-x-hidden">
  <PageHeader title="Contact" subtitle="Platforms where I roam around on." />
  <div class="contact-links-container">
    <div class="contact-links">
      {#each contactLinks as link, i}
        {#if i > 0}
          <div class="divider-h-dark"></div>
        {/if}
        {@const props = getContactLinkProps(link)}
        <ContactLink animationDelay="{(i + 1) * 0.1}s" {...props} />
      {/each}
    </div>
  </div>
</main>
