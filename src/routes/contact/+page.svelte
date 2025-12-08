<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
  import ContactLink from '$components/ContactLink.svelte';

  let copied = $state(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  };
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0 overflow-x-hidden">
  <PageHeader title="Contact" subtitle="Platforms where I roam around on." />
  <div class="contact-links-container">
    <div class="contact-links">
      <ContactLink
        animationDelay="0.1s"
        text="Discord Contact"
        mainIcon="simple-icons:discord"
        action={() => copyToClipboard('lorddeathunter')}
        actionIcon="pixelarticons:copy"
        actionText={copied ? 'Copied!' : 'Copy'}
      />
      <div class="divider-h-dark"></div>
      <ContactLink
        animationDelay="0.2s"
        text="Personal Discord Server"
        mainIcon="simple-icons:discord"
        action={() => window.open('https://discord.gg/vcQEH4x6z2')}
        actionIcon="pixelarticons:external-link"
        actionText="Join"
      />
      <div class="divider-h-dark"></div>
      <ContactLink
        animationDelay="0.3s"
        text="GitHub"
        mainIcon="simple-icons:github"
        action={() => window.open('https://github.com/lorddeathunter')}
        actionIcon="pixelarticons:external-link"
        actionText="Open"
      />
      <div class="divider-h-dark"></div>
      <ContactLink
        animationDelay="0.4s"
        text="CurseForge"
        mainIcon="simple-icons:curseforge"
        action={() => window.open('https://www.curseforge.com/members/lorddeathunter/projects')}
        actionIcon="pixelarticons:external-link"
        actionText="Open"
      />
      <div class="divider-h-dark"></div>
      <ContactLink
        animationDelay="0.5s"
        text="Itch.io"
        mainIcon="simple-icons:itchdotio"
        action={() => window.open('https://lorddeathunter.itch.io/')}
        actionIcon="pixelarticons:external-link"
        actionText="Open"
      />
    </div>
  </div>
</main>
