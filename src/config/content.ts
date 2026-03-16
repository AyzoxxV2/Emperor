// ═══════════════════════════════════════════════════════════════
// EMPEROR — CONTENT CONFIG
// Edit this file to change ALL texts and images across the site.
// No coding knowledge required — just change the values below.
// ═══════════════════════════════════════════════════════════════

export const SITE_CONFIG = {

  // ── Brand ────────────────────────────────────────────────────
  brand: {
    name: 'EMPEROR',
    tagline: 'Gaming Platform',
    foundedYear: '2025',
    logoGif: '/emperor/emperor_bot_avatar_ani.gif',
    statueGif: '/emperor/emperor_statue.gif',
    welcomeImg: '/emperor/welcome.png',
    goodbyeImg: '/emperor/goodbye.png',
    faqBannerImg: '/emperor/Banners.png',
    avatarGif: '/emperor/avatar.gif',
  },

  // ── Links ─────────────────────────────────────────────────────
  links: {
    discord: 'https://discord.gg/TjXbYS9DZu',
    supportEmail: 'support@emperor.gg',
    twitter: '#',
    github: '#',
    docs: '#',
    changelog: '#',
    roadmap: '#',
    statusPage: '#',
    bugReport: '#',
  },

  // ── Hero section ──────────────────────────────────────────────
  hero: {
    badge: 'Since 2025 — #1 Gaming Platform',
    titleLine1: 'WELCOME TO',
    titleLine2: 'EMPEROR',
    description: 'The all-in-one gaming platform. Launcher, optimizer, cloud saves and streaming tools — built to win.',
    ctaPrimary: 'See Plans',
    ctaSecondary: 'Learn More',
    floatingCardName: 'Emperor Platform',
    floatingCardStatus: 'Online — 50,042 members',
    stats: [
      { value: '50K+', label: 'Active Members' },
      { value: '99.9%', label: 'Uptime guaranteed' },
      { value: '< 1s', label: 'Launch time' },
    ],
  },

  // ── Navbar ────────────────────────────────────────────────────
  navbar: {
    links: [
      { label: 'Products', to: '/products' },
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Support', to: '/support' },
      { label: 'Vouchers', to: '/vouchers' },
    ],
    ctaLabel: 'Get Started',
    signinLabel: 'Sign in',
  },

  // ── Auth modal ────────────────────────────────────────────────
  auth: {
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to your account',
      submitLabel: 'Sign in',
      switchText: "Don't have an account?",
      switchLabel: 'Create one',
    },
    register: {
      title: 'Create account',
      subtitle: 'Join the Emperor gaming platform',
      submitLabel: 'Create account',
      switchText: 'Already have an account?',
      switchLabel: 'Sign in',
      // ── Shown after successful registration ──
      pendingTitle: 'Check your inbox! 📧',
      pendingSubtitle: 'We sent a confirmation link to:',
      pendingNote: 'Check your spam folder if you don\'t see it within a few minutes.',
      pendingSpamTip: '💡 Tip: Add support@emperor.gg to your contacts to avoid spam.',
    },
    successLogin: 'Welcome back! ⚡',
    successRegister: 'Welcome to the Empire! 👑',
  },

  // ── Loader ────────────────────────────────────────────────────
  loader: {
    steps: [
      { pct: 15, text: 'LOADING MODULES...' },
      { pct: 32, text: 'VERIFYING LICENSE...' },
      { pct: 54, text: 'CONNECTING TO SERVERS...' },
      { pct: 71, text: 'SYNCING CLOUD...' },
      { pct: 88, text: 'OPTIMIZING SYSTEM...' },
      { pct: 96, text: 'ALMOST READY...' },
      { pct: 100, text: 'WELCOME TO EMPEROR' },
    ],
  },

  // ── Marquee divider ───────────────────────────────────────────
  marquee: {
    items: ['EMPEROR', 'GAMING PLATFORM', 'SINCE 2025', '50K MEMBERS'],
  },

  // ── Features section ──────────────────────────────────────────
  features: {
    sectionLabel: 'Why Emperor',
    title: 'Everything you need',
    titleGold: 'to dominate',
    items: [
      {
        icon: '⚡',
        title: 'Ultra-Fast Launch',
        desc: 'Launch any game in under a second. Emperor pre-loads your titles and auto-optimizes system resources.',
      },
      {
        icon: '🛡️',
        title: '3-Year Warranty',
        desc: 'All products backed by a 3-year guarantee with premium 24/7 support included.',
      },
      {
        icon: '☁️',
        title: 'Cloud Sync',
        desc: 'Saves backed up automatically. Resume from any PC, anytime, anywhere in the world.',
      },
      {
        icon: '🎧',
        title: '24/7 Support',
        desc: 'Dedicated team on Discord around the clock. Average response time under 2 hours.',
      },
    ],
  },

  // ── Testimonials ──────────────────────────────────────────────
  testimonials: {
    sectionLabel: 'Reviews',
    title: 'Trusted by',
    titleGold: '50,000+ gamers',
    items: [
      {
        name: 'xX_Shadow_Xx',
        avatar: '🎮',
        stars: 5,
        text: 'Emperor Booster PRO gave me +55 FPS in Valorant. I went from Silver to Platinum in 2 weeks.',
        product: 'BOOSTER PRO',
      },
      {
        name: 'StreamerKing',
        avatar: '📺',
        stars: 5,
        text: "The Stream Tools pack is insane. My overlays look professional and my OBS never drops frames anymore.",
        product: 'STREAM TOOLS',
      },
      {
        name: 'NightWolf99',
        avatar: '🐺',
        stars: 5,
        text: 'Lifetime Access was the best gaming investment I ever made. Everything just works perfectly.',
        product: 'LIFETIME ACCESS',
      },
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────────
  faq: {
    sectionLabel: 'FAQ',
    title: 'Got',
    titleGold: 'questions?',
    subtitle: "Can't find your answer here?\nJoin our Discord — we reply in under 2 hours.",
    discordLabel: 'Join Discord',
    items: [
      {
        q: 'Is Emperor compatible with all games?',
        a: 'Yes! Emperor Launcher supports 500+ games including Valorant, CS2, Fortnite, Apex Legends, and more. The list is updated weekly.',
      },
      {
        q: 'Can I try it for free?',
        a: 'Join our Discord server to get access to free tools, community support, and monthly giveaways — completely free, no credit card needed.',
      },
      {
        q: 'How does Booster PRO work?',
        a: 'It automatically optimizes Windows processes, frees RAM, and adjusts network settings to reduce latency. On average, users gain +40% FPS instantly.',
      },
      {
        q: 'Can I cancel my subscription?',
        a: 'Yes, at any time from your member dashboard. You keep access until the end of your paid period. No questions asked.',
      },
      {
        q: 'Does Lifetime Access include future updates?',
        a: 'Yes! Lifetime Access includes absolutely every future update, new tool, and feature — forever.',
      },
    ],
  },

  // ── CTA Banner ────────────────────────────────────────────────
  ctaBanner: {
    badge: 'Join 50,000+ gamers',
    title: 'Ready to join',
    titleGold: 'the Empire?',
    subtitle: 'Start free. Upgrade when you\'re ready.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Join Discord',
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    description: 'The all-in-one gaming platform. Launcher, optimizer, cloud saves and streaming tools — built for players who want to win.',
    columns: {
      product: {
        title: 'Product',
        links: [
          { label: 'Products', to: '/products' },
          { label: 'Features', to: '/features' },
          { label: 'Pricing', to: '/pricing' },
          { label: 'Changelog', to: '#' },
          { label: 'Roadmap', to: '#' },
        ],
      },
      support: {
        title: 'Support',
        links: [
          { label: 'Help Center', to: '/support' },
          { label: 'Discord', to: 'https://discord.gg/TjXbYS9DZu', external: true },
          { label: 'Email Us', to: 'mailto:support@emperor.gg', external: true },
          { label: 'Status', to: '#' },
          { label: 'Report a Bug', to: '#' },
        ],
      },
      legal: {
        title: 'Legal',
        links: [
          { label: 'Terms of Service', to: '#' },
          { label: 'Privacy Policy', to: '#' },
          { label: 'Cookie Policy', to: '#' },
          { label: 'Refund Policy', to: '#' },
        ],
      },
    },
    badges: ['🔒 SSL Secured', '⚡ 99.9% Uptime', '🌍 Global CDN'],
    copyright: '© 2025 Emperor Gaming Platform. All rights reserved.',
  },

  // ── Products page ─────────────────────────────────────────────
  productsPage: {
    badge: 'Full Catalog',
    title: 'Our',
    titleGold: 'Products',
    subtitle: 'Everything you need to dominate your game.',
  },

  // ── Features page ─────────────────────────────────────────────
  featuresPage: {
    badge: 'Platform Features',
    title: 'Built to',
    titleGold: 'Win',
    subtitle: 'Every feature designed with one goal: make you a better gamer.',
    ctaTitle: 'Ready to join the',
    ctaTitleGold: 'Empire?',
    ctaSubtitle: 'Start free — upgrade whenever you\'re ready.',
  },

  // ── Pricing page ──────────────────────────────────────────────
  pricingPage: {
    badge: 'Simple Pricing',
    title: 'Choose your',
    titleGold: 'Plan',
    subtitle: 'No hidden fees. Cancel anytime.',
  },

  // ── Support page ──────────────────────────────────────────────
  supportPage: {
    badge: '24/7 Support',
    title: "We've got you",
    titleGold: 'covered',
    subtitle: 'AI support available instantly. Human support in under 2 hours.',
    botName: 'Emperor Support Bot',
    botStatus: 'Online — replies instantly',
    botWelcome: "👋 Welcome to Emperor Support! I'm your AI assistant. Ask me anything — or join our Discord for live help.",
    quickReplies: ['Launcher issue', 'FPS problem', 'Cloud saves', 'Billing', 'Discord link'],
    discordCardName: 'Discord Server',
    discordCardDesc: '50K+ members • Live support',
    emailCardName: 'Email Support',
    emailCardDesc: 'support@emperor.gg • < 2h reply',
  },

  // ── Dashboard page ────────────────────────────────────────────
  dashboard: {
    downloadTitle: 'Download Emperor',
    downloadDesc: 'Get the latest version of the Emperor launcher for Windows.',
    downloadLabel: 'Windows (64-bit)',
    downloadVersion: 'v2.4.1 — Released March 2025',
    upgradeTitle: 'Your Plan',
    upgradeDesc: 'Upgrade to unlock Booster PRO, priority support and more.',
    upgradeLabel: 'Upgrade Now',
  },

};

// ── Type export for autocomplete ─────────────────────────────────
export type SiteConfig = typeof SITE_CONFIG;
