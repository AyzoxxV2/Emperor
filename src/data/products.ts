export interface Product {
  id: number;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeType?: 'gold' | 'red' | 'cyan' | 'green';
  category: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
  popular?: boolean;
  isFree?: boolean;       // redirects to Discord instead of cart
  discordUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const DISCORD_URL = 'https://discord.gg/TjXbYS9DZu';

export const products: Product[] = [
  {
    id: 1,
    name: "FREE ACCESS",
    tagline: "Join our Discord for free tools & community",
    price: 0,
    badge: "FREE",
    badgeType: "green",
    category: "Community",
    isFree: true,
    discordUrl: DISCORD_URL,
    description: "Get access to our free tools, resources and community by joining the Emperor Discord server. Free channels include basic optimizer tips, community support, and monthly giveaways.",
    features: [
      "Access to #free-tools channel",
      "Community support",
      "Monthly giveaways",
      "Emperor news & updates",
      "Basic optimization guides",
    ],
    color: "#00FF87",
    icon: "💬",
  },
  {
    id: 2,
    name: "BOOSTER PRO",
    tagline: "Max your FPS, destroy your latency",
    price: 9.99,
    originalPrice: 19.99,
    badge: "POPULAR",
    badgeType: "gold",
    category: "Optimizer",
    popular: true,
    description: "Advanced system optimizer that automatically extracts maximum gaming performance from your PC.",
    features: [
      "+40% FPS guaranteed",
      "Network latency reducer",
      "Auto RAM cleaner",
      "Dedicated gaming mode",
      "Priority support 24/7",
      "1-click activation",
    ],
    color: "#FFD700",
    icon: "⚡",
  },
  {
    id: 3,
    name: "CLOUD SAVES",
    tagline: "Your saves. Everywhere. Always.",
    price: 4.99,
    badge: "ESSENTIAL",
    badgeType: "cyan",
    category: "Cloud",
    description: "Automatically sync all your game saves to the cloud. Resume from any PC, anytime.",
    features: [
      "Auto sync on every session",
      "100 GB secure storage",
      "Multi-PC access",
      "30-version history",
      "1-click restore",
    ],
    color: "#00D4FF",
    icon: "☁️",
  },
  {
    id: 4,
    name: "EMPEROR ELITE",
    tagline: "The ultimate gaming experience — all-in-one",
    price: 19.99,
    originalPrice: 49.99,
    badge: "BEST VALUE",
    badgeType: "gold",
    category: "Bundle",
    popular: true,
    description: "The complete Emperor bundle: Launcher + Booster Pro + Cloud Saves + VIP server access and dedicated support.",
    features: [
      "Premium Launcher",
      "Booster Pro included",
      "500 GB Cloud Storage",
      "VIP Discord server access",
      "Dedicated Discord support",
      "Early beta access",
    ],
    color: "#FFD700",
    icon: "👑",
  },
  {
    id: 5,
    name: "STREAM TOOLS",
    tagline: "Go live like a pro from day one",
    price: 7.99,
    originalPrice: 14.99,
    badge: "−47%",
    badgeType: "red",
    category: "Streaming",
    description: "Complete streamer toolkit: premium overlays, alerts, scene management and OBS optimization.",
    features: [
      "Premium stream overlays",
      "Twitch/YouTube alerts",
      "Auto OBS optimization",
      "Pre-built scene templates",
      "Custom branding tools",
    ],
    color: "#C41E00",
    icon: "🎥",
  },
  {
    id: 6,
    name: "LIFETIME ACCESS",
    tagline: "Pay once. Yours forever.",
    price: 39.99,
    originalPrice: 99.99,
    badge: "LIFETIME",
    badgeType: "gold",
    category: "Lifetime",
    description: "Permanent access to every Emperor tool, all future updates included forever.",
    features: [
      "Lifetime full access",
      "All current tools",
      "All future updates included",
      "VIP permanent support",
      "Early beta access",
      "Private community",
    ],
    color: "#FFD700",
    icon: "♾️",
  },
];
