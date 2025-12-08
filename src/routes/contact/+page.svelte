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

<main id="contact" class="bg-contact flex flex-col items-center gap-0 overflow-x-hidden">
  <div class="page-content">
    <h1 class="fade-in text-4xl font-[960] sm:text-5xl md:text-6xl lg:text-7xl">Contact</h1>
    <p class="fade-in text-center text-lg opacity-80 sm:text-xl">
      Platforms where I roam around on.
    </p>
    <NavBar />
  </div>
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
