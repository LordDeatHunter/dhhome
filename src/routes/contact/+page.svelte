<script lang="ts">
  import '../../style.css';
  import NavBar from '../NavBar.svelte';
  import ContactLink from '../../components/ContactLink.svelte';

  let copied = false;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  };
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0">
  <div class="grow-in flex flex-col items-center justify-center gap-4 pt-12">
    <h1 class="fade-in text-7xl font-[960]">Contact</h1>
    <NavBar />
  </div>
  <div class="contact-links">
    <ContactLink
      text="Discord"
      mainIcon="simple-icons:discord"
      action={() => copyToClipboard('lorddeathunter')}
      actionIcon="pixelarticons:copy"
      actionText={copied ? 'Copied!' : 'Copy'}
    />
    <div class="divider-h-dark" />
    <ContactLink
      text="GitHub"
      mainIcon="simple-icons:github"
      action={() => window.open('https://github.com/lorddeathunter')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
    <div class="divider-h-dark" />
    <ContactLink
      text="CurseForge"
      mainIcon="simple-icons:curseforge"
      action={() => window.open('https://www.curseforge.com/members/lorddeathunter/projects')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
    <div class="divider-h-dark" />
    <ContactLink
      text="Itch.io"
      mainIcon="simple-icons:itchdotio"
      action={() => window.open('https://lorddeathunter.itch.io/')}
      actionIcon="pixelarticons:external-link"
      actionText="Open"
    />
  </div>
</main>
