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
    copyright: '© 2025 Emperor Gaming Platform. All rights reserved.',
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

  // ── Hero ──────────────────────────────────────────────────────
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

  // ── Marquee ───────────────────────────────────────────────────
  marquee: {
    items: ['EMPEROR', 'GAMING PLATFORM', 'SINCE 2025', '50K MEMBERS'],
  },

  // ── Auth ──────────────────────────────────────────────────────
  auth: {
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to your account',
      submitLabel: 'Sign in',
      switchText: "Don't have an account?",
      switchLabel: 'Create one',
      forgotPassword: 'Forgot password?',
      successMessage: 'Welcome back! ⚡',
    },
    register: {
      title: 'Create account',
      subtitle: 'Join the Emperor gaming platform',
      submitLabel: 'Create account',
      switchText: 'Already have an account?',
      switchLabel: 'Sign in',
      pendingTitle: 'Check your inbox! 📧',
      pendingSubtitle: 'We sent a confirmation link to:',
      pendingNote: "Check your spam folder if you don't see it within a few minutes.",
      pendingSpamTip: '💡 Tip: Add support@emperor.gg to your contacts to avoid spam.',
      pendingCta: 'Got it!',
      pendingResend: "Didn't receive it? Resend email",
      successMessage: 'Welcome to the Empire! 👑',
    },
    otp: {
      title: 'Check your email',
      subtitle: 'We sent a 6-digit code to',
      spamNote: "Check your spam folder if you don't see it.",
      verifyLabel: 'Verify',
      resendLabel: 'Resend code',
      resendCountdown: 'Resend code in',
      successMessage: 'Verified! Welcome back ⚡',
    },
  },

  // ── Features section (homepage) ───────────────────────────────
  features: {
    sectionLabel: 'Why Emperor',
    title: 'Everything you need',
    titleGold: 'to dominate',
    items: [
      { icon: '⚡', title: 'Ultra-Fast Launch', desc: 'Launch any game in under a second. Emperor pre-loads your titles and auto-optimizes system resources.' },
      { icon: '🛡️', title: '3-Year Warranty', desc: 'All products backed by a 3-year guarantee with premium 24/7 support included.' },
      { icon: '☁️', title: 'Cloud Sync', desc: 'Saves backed up automatically. Resume from any PC, anytime, anywhere in the world.' },
      { icon: '🎧', title: '24/7 Support', desc: 'Dedicated team on Discord around the clock. Average response time under 2 hours.' },
    ],
  },

  // ── Testimonials ──────────────────────────────────────────────
  testimonials: {
    sectionLabel: 'Reviews',
    title: 'Trusted by',
    titleGold: '50,000+ gamers',
    items: [
      { name: 'xX_Shadow_Xx', avatar: '🎮', stars: 5, text: 'Emperor Booster PRO gave me +55 FPS in Valorant. I went from Silver to Platinum in 2 weeks.', product: 'BOOSTER PRO' },
      { name: 'StreamerKing', avatar: '📺', stars: 5, text: "The Stream Tools pack is insane. My overlays look professional and my OBS never drops frames anymore.", product: 'STREAM TOOLS' },
      { name: 'NightWolf99', avatar: '🐺', stars: 5, text: 'Lifetime Access was the best gaming investment I ever made. Everything just works perfectly.', product: 'LIFETIME ACCESS' },
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
      { q: 'Is Emperor compatible with all games?', a: 'Yes! Emperor Launcher supports 500+ games including Valorant, CS2, Fortnite, Apex Legends, and more. The list is updated weekly.' },
      { q: 'Can I try it for free?', a: 'Join our Discord server to get access to free tools, community support, and monthly giveaways — completely free, no credit card needed.' },
      { q: 'How does Booster PRO work?', a: 'It automatically optimizes Windows processes, frees RAM, and adjusts network settings to reduce latency. On average, users gain +40% FPS instantly.' },
      { q: 'Can I cancel my subscription?', a: 'Yes, at any time from your member dashboard. You keep access until the end of your paid period. No questions asked.' },
      { q: 'Does Lifetime Access include future updates?', a: 'Yes! Lifetime Access includes absolutely every future update, new tool, and feature — forever.' },
    ],
  },

  // ── CTA Banner ────────────────────────────────────────────────
  ctaBanner: {
    badge: 'Join 50,000+ gamers',
    title: 'Ready to join',
    titleGold: 'the Empire?',
    subtitle: "Start free. Upgrade when you're ready.",
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Join Discord',
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    description: 'The all-in-one gaming platform. Launcher, optimizer, cloud saves and streaming tools — built for players who want to win.',
    badges: ['🔒 SSL Secured', '⚡ 99.9% Uptime', '🌍 Global CDN'],
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
    ctaSubtitle: "Start free — upgrade whenever you're ready.",
    stats: [
      { val: '50K+', label: 'Active Members' },
      { val: '+40%', label: 'Average FPS Gain' },
      { val: '99.9%', label: 'Platform Uptime' },
      { val: '500+', label: 'Supported Games' },
      { val: '< 1s', label: 'Launch Time' },
      { val: '24/7', label: 'Support Available' },
    ],
    features: [
      { tag: 'Performance', title: 'Ultra-Fast Launcher', desc: 'Launch any game in under a second. Emperor pre-loads your favorite titles and optimizes system resources automatically before you even click play.' },
      { tag: 'AI', title: 'AI-Powered Optimization', desc: 'Our AI engine analyzes your hardware in real-time and adjusts CPU, GPU, and RAM allocation for maximum FPS. No manual tweaking required.' },
      { tag: 'Cloud', title: 'Cloud Game Saves', desc: 'Every save is automatically backed up to our servers. Switch PCs, reinstall Windows, lose your drive — your progress is always safe.' },
      { tag: 'Network', title: 'Network Booster', desc: 'Proprietary routing algorithms reduce ping and packet loss. Emperor finds the fastest path to game servers so you never blame lag again.' },
      { tag: 'HUD', title: 'In-Game Overlay', desc: 'A sleek, non-intrusive overlay shows FPS, ping, GPU temp, and RAM usage. Customize it to show exactly what you need, where you need it.' },
      { tag: 'Security', title: 'Privacy First', desc: "We never collect gameplay data or share your information. Emperor runs locally with end-to-end encryption for all cloud features." },
      { tag: 'Analytics', title: 'Performance Analytics', desc: 'Detailed session reports show your average FPS, hotspots, and system bottlenecks. Understand your PC and fix what matters.' },
      { tag: 'Profiles', title: 'Per-Game Profiles', desc: 'Create separate optimization profiles for each game. Competitive shooter? Max FPS. Open world RPG? Balanced quality. Switch instantly.' },
      { tag: 'Security', title: 'Secure Vault', desc: 'Store game keys, 2FA backup codes, and account credentials in our encrypted vault. Access from any device, protected by your master password.' },
    ],
  },

  // ── Pricing page ──────────────────────────────────────────────
  pricingPage: {
    badge: 'Simple Pricing',
    title: 'Choose your',
    titleGold: 'Plan',
    subtitle: 'No hidden fees. Cancel anytime.',
    billingMonthly: 'Monthly',
    billingYearly: 'Yearly',
    savingLabel: 'Save 25%',
    comparisonTitle: 'Full',
    comparisonTitleGold: 'Comparison',
    faqTitle: 'Pricing',
    faqTitleGold: 'FAQ',
    faq: [
      { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade at any time. Changes take effect on your next billing cycle.' },
      { q: 'Is there a free trial for paid plans?', a: 'Our Free plan is permanent and has no trial expiry. For Pro and Elite, we offer a 7-day money-back guarantee.' },
      { q: 'What payment methods do you accept?', a: 'All purchases are handled via our Discord server for maximum security.' },
      { q: 'Does Lifetime Access include future features?', a: 'Absolutely. Lifetime Access includes every feature we ever release, forever.' },
    ],
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
    botReplies: {
      default: "Thanks for reaching out! Our support team will get back to you within 2 hours. In the meantime, check our FAQ or join our Discord server for instant community help.",
      launch: "To fix launcher issues: 1) Run as Administrator 2) Disable antivirus temporarily 3) Reinstall Emperor. If it persists, share your error log in Discord.",
      fps: "For FPS issues: make sure Booster PRO is enabled and set to 'Gaming Mode'. Check that no background apps are stealing resources.",
      cloud: "Cloud saves sync automatically every 5 minutes while a game is running. To force a sync, go to Settings → Cloud → Sync Now.",
      billing: "For billing questions, contact us on Discord or email support@emperor.gg. We have a 30-day money-back guarantee.",
      discord: "Join our Discord server: discord.gg/TjXbYS9DZu — our community and support team are active 24/7!",
      hello: "Hey! 👋 Welcome to Emperor Support. How can I help you today?",
      help: "Of course! I'm here to help. Common topics: launcher issues, FPS optimization, cloud saves, billing, or Discord. What's your question?",
    },
    faqItems: [
      { q: 'How do I activate Booster PRO?', a: 'After purchase, go to Settings → Optimizer → Enable Booster PRO. It activates automatically when you launch any supported game.' },
      { q: 'How do cloud saves work?', a: 'Emperor automatically detects and backs up your save files every 5 minutes. Access them from any PC by signing into your account.' },
      { q: 'Emperor is not launching on my PC', a: 'Try running as Administrator, disabling antivirus temporarily, and making sure you have .NET 6 and VC++ Redistributable installed.' },
      { q: 'Is Emperor safe to use?', a: "Absolutely. Emperor never modifies game files, doesn't collect data without consent, and is scanned weekly for malware." },
    ],
  },

  // ── Vouchers page ─────────────────────────────────────────────
  vouchersPage: {
    badge: 'Verified Reviews',
    title: 'Customer',
    titleGold: 'Vouchers',
    subtitle: 'Real reviews from real Emperor members.',
    statLabels: {
      avgRating: 'Average Rating',
      totalReviews: 'Verified Reviews',
      verifiedPurchases: 'Verified Purchases',
    },
    submitBtn: 'Leave a Review',
    cancelBtn: 'Cancel',
    loginNotice: 'Sign in to leave a review',
    emptyTitle: 'No reviews yet',
    emptySubtitle: 'Be the first to leave a review!',
    form: {
      title: 'Leave a Review',
      usernamePlaceholder: 'YourName',
      discordPlaceholder: 'Name#1234 (optional)',
      reviewPlaceholder: 'Share your experience with Emperor...',
      uploadLabel: 'Click to upload screenshot',
      uploadHint: 'PNG, JPG up to 5MB',
      submitLabel: 'Submit Review',
      successTitle: 'Voucher submitted!',
      successMsg: 'Your review is pending admin approval and will appear shortly.',
    },
  },

  // ── Dashboard page ────────────────────────────────────────────
  dashboardPage: {
    downloadTitle: 'Download Emperor',
    downloadDesc: 'Get the latest version of the Emperor launcher for Windows.',
    downloadLabel: 'Windows (64-bit)',
    downloadVersion: 'v2.4.1 — Released March 2025',
    upgradeTitle: 'Your Plan',
    upgradeDesc: 'Upgrade to unlock Booster PRO, priority support and more.',
    upgradeLabel: 'Upgrade Now',
    planUpgradeMsg: '🎉 Enjoy all your premium features!',
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { label: 'Discord Server', url: 'https://discord.gg/TjXbYS9DZu', icon: '💬' },
      { label: 'Documentation', url: '#', icon: '📖' },
      { label: 'Changelog', url: '#', icon: '📋' },
      { label: 'Report a Bug', url: '#', icon: '🐛' },
    ],
  },

  // ── 404 page ──────────────────────────────────────────────────
  notFoundPage: {
    title: 'Lost in the',
    titleGold: 'Empire?',
    subtitle: "This page doesn't exist or has been moved.\nThe Emperor's realm awaits you back home.",
    ctaPrimary: 'Back to Home',
    ctaSecondary: 'Browse Plans',
    scanText: 'ERROR_404 // REDIRECTING...',
  },

  // ── Profile page ──────────────────────────────────────────────
  profilePage: {
    editTitle: 'Edit Profile',
    usernamePlaceholder: 'Your username',
    emailHint: 'Email cannot be changed',
    saveLabel: 'Save Changes',
    accountInfoTitle: 'Account Info',
    upgradeTitle: 'Upgrade your plan',
    upgradeDesc: 'Get access to premium features, priority support and more.',
    upgradeLabel: 'See Plans',
  },

  // ── Cart ──────────────────────────────────────────────────────
  cart: {
    title: 'Cart',
    emptyTitle: 'Your cart is empty',
    emptySubtitle: 'Explore our plans and level up your game',
    emptyBtn: 'Browse Plans',
    subtotalLabel: 'Subtotal',
    shippingLabel: 'Shipping',
    shippingValue: 'Free',
    totalLabel: 'Total',
    payLabel: 'Pay now',
    signInLabel: 'Sign in to purchase',
    signInNotice: 'Sign in to complete your purchase',
    trustBadges: ['🔒 SSL Secure', '🚀 Instant access', '↩️ 30-day refund'],
    successTitle: 'Order confirmed!',
    successMsg: "Your order was saved to your account.\nYou'll receive a confirmation email shortly.",
  },

  // ── Product cards ─────────────────────────────────────────────
  productCard: {
    buyOnDiscordLabel: 'Buy on Discord',
    discordNote: 'Opens discord.gg/TjXbYS9DZu',
    plansSubtitle: 'All purchases are handled securely via our Discord server.',
  },

};

export type SiteConfig = typeof SITE_CONFIG;
