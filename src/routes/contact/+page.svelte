<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import ContactLink from '$components/ContactLink.svelte';

  let copied = $state(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  };
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0">
  <div class="page-content">
    <h1 class="fade-in text-7xl font-[960]">Contact</h1>
    <NavBar />
  </div>
  <div class="contact-links">
    <ContactLink
      text="Discord Contact"
      mainIcon="simple-icons:discord"
      action={() => copyToClipboard('lorddeathunter')}
      actionIcon="pixelarticons:copy"
      actionText={copied ? 'Copied!' : 'Copy'}
    />
    <div class="divider-h-dark"></div>
    <ContactLink
      text="Personal Discord Server"
      mainIcon="simple-icons:discord"
      action={() => window.open('https://discord.gg/vcQEH4x6z2')}
      actionIcon="pixelarticons:external-link"
      actionText="Join"
    />
    <div class="divider-h-dark"></div>
    <ContactLink
      text="GitHub"
      mainIcon="simple-icons:github"
      action={() => window.open('https://github.com/lorddeathunter')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
    <div class="divider-h-dark"></div>
    <ContactLink
      text="CurseForge"
      mainIcon="simple-icons:curseforge"
      action={() => window.open('https://www.curseforge.com/members/lorddeathunter/projects')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
    <div class="divider-h-dark"></div>
    <ContactLink
      text="Itch.io"
      mainIcon="simple-icons:itchdotio"
      action={() => window.open('https://lorddeathunter.itch.io/')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
  </div>
</main>
