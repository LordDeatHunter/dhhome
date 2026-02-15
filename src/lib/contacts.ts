interface BaseContactLink {
  text: string;
  mainIcon: string;
  actionIcon: string;
  actionText: string;
}

export interface ExternalContactLink extends BaseContactLink {
  type: 'external';
  url: string;
}

export interface CopiableContactLink extends BaseContactLink {
  type: 'copiable';
  copyText: string;
  copiedText?: string;
}

export type ContactLink = ExternalContactLink | CopiableContactLink;

export const contactLinks: ContactLink[] = [
  {
    type: 'copiable',
    text: 'Discord Contact',
    mainIcon: 'simple-icons:discord',
    actionIcon: 'pixelarticons:copy',
    actionText: 'Copy',
    copyText: 'lorddeathunter',
    copiedText: 'Copied!'
  },
  {
    type: 'external',
    text: 'Personal Discord Server',
    mainIcon: 'simple-icons:discord',
    url: 'https://discord.gg/vcQEH4x6z2',
    actionIcon: 'pixelarticons:external-link',
    actionText: 'Join'
  },
  {
    type: 'external',
    text: 'GitHub',
    mainIcon: 'simple-icons:github',
    url: 'https://github.com/lorddeathunter',
    actionIcon: 'pixelarticons:external-link',
    actionText: 'Open'
  },
  {
    type: 'external',
    text: 'CurseForge',
    mainIcon: 'simple-icons:curseforge',
    url: 'https://www.curseforge.com/members/lorddeathunter/projects',
    actionIcon: 'pixelarticons:external-link',
    actionText: 'Open'
  },
  {
    type: 'external',
    text: 'Modrinth',
    mainIcon: 'simple-icons:modrinth',
    url: 'https://modrinth.com/user/LordDeatHunter/',
    actionIcon: 'pixelarticons:external-link',
    actionText: 'Open'
  },
  {
    type: 'external',
    text: 'Itch.io',
    mainIcon: 'simple-icons:itchdotio',
    url: 'https://lorddeathunter.itch.io/',
    actionIcon: 'pixelarticons:external-link',
    actionText: 'Open'
  }
];
