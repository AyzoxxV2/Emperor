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
  discordUrl: string; // All products redirect to Discord
}

export interface CartItem extends Product {
  quantity: number;
}

export const DISCORD_URL = 'https://discord.gg/TjXbYS9DZu';

export const products: Product[] = [
  {
    id: 1,
    name: "EMULATOR",
    tagline: "The ultimate emulation experience",
    price: 9.99,
    originalPrice: 19.99,
    badge: "POPULAR",
    badgeType: "gold",
    category: "Emulator",
    popular: true,
    description: "Emperor's flagship emulator — blazing fast, optimized and undetectable. The go-to choice for serious players.",
    features: [
      "High performance emulation",
      "Undetectable & secure",
      "Auto-updates included",
      "Priority support 24/7",
      "Easy 1-click setup",
    ],
    color: "#FFD700",
    icon: "🎮",
    discordUrl: DISCORD_URL,
  },
  {
    id: 2,
    name: "VAL VIP",
    tagline: "VIP access — the premium experience",
    price: 19.99,
    originalPrice: 39.99,
    badge: "BEST VALUE",
    badgeType: "gold",
    category: "Valorant",
    popular: true,
    description: "Emperor's top-tier VIP package. Full access to all premium features with VIP server and dedicated support.",
    features: [
      "Full VIP access",
      "Exclusive VIP Discord channel",
      "Dedicated support",
      "All features unlocked",
      "Early access to updates",
      "Lifetime updates",
    ],
    color: "#FFD700",
    icon: "👑",
    discordUrl: DISCORD_URL,
  },
  {
    id: 3,
    name: "VAL PLUS",
    tagline: "Enhanced performance, enhanced experience",
    price: 14.99,
    originalPrice: 24.99,
    badge: "NEW",
    badgeType: "cyan",
    category: "Valorant",
    description: "The Plus tier — a step above the standard with more features, better performance and priority updates.",
    features: [
      "Enhanced features",
      "Performance boost",
      "Priority updates",
      "Community support",
      "Multi-account support",
    ],
    color: "#00D4FF",
    icon: "⚡",
    discordUrl: DISCORD_URL,
  },
  {
    id: 4,
    name: "POPUP",
    tagline: "Instant access, instant results",
    price: 4.99,
    badge: "STARTER",
    badgeType: "green",
    category: "Popup",
    description: "Emperor's entry-level product. Perfect to get started quickly with minimal setup and instant activation.",
    features: [
      "Instant activation",
      "Simple setup",
      "Community support",
      "Regular updates",
      "Beginner friendly",
    ],
    color: "#00FF87",
    icon: "🚀",
    discordUrl: DISCORD_URL,
  },
  {
    id: 5,
    name: "VAL INTERNAL",
    tagline: "Internal access — maximum power",
    price: 29.99,
    originalPrice: 59.99,
    badge: "ELITE",
    badgeType: "red",
    category: "Valorant",
    description: "Emperor's most powerful internal product. Deep system integration for maximum performance and reliability.",
    features: [
      "Internal deep integration",
      "Maximum performance",
      "Highest stability",
      "Elite Discord channel",
      "Dedicated elite support",
      "All future updates",
    ],
    color: "#C41E00",
    icon: "🔥",
    discordUrl: DISCORD_URL,
  },
];
