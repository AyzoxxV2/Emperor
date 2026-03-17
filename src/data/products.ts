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
  discordUrl: string;
  pricing?: { label: string; usd: string; vnd?: string }[];
}

export interface CartItem extends Product { quantity: number; }
export const DISCORD_URL = 'https://discord.gg/TjXbYS9DZu';

export const products: Product[] = [
  {
    id: 1,
    name: "VAL-VIP BYPASS",
    tagline: "Single PC bypass — smart detection avoidance",
    price: 14.99,
    badge: "POPULAR",
    badgeType: "gold",
    category: "Bypass",
    popular: true,
    description: "The #1 single PC bypass solution. Compatible with internal cheats, supports mixed mode and smart detection avoidance.",
    features: [
      "Single PC Setup", "Internal Cheat Compatible", "Mixed Mode Support", "Smart Detection Avoidance",
      "Bypass Delay Ban", "Bypass Popup", "Semi-Rage Mode", "Legit vs Cheat Compatibility",
      "Low Latency", "Stable Operation", "Quick Response", "Optimized for 1PC",
    ],
    color: "#FFD700", icon: "🛡️", discordUrl: DISCORD_URL,
    pricing: [
      { label: "Day", usd: "$14.99", vnd: "99k VNĐ" },
      { label: "Weekly", usd: "$24.99", vnd: "599k VNĐ" },
      { label: "Monthly", usd: "$39.99", vnd: "1TR1 VNĐ" },
      { label: "Lifetime", usd: "$129.99", vnd: "3TR5 VNĐ" },
    ],
  },
  {
    id: 2,
    name: "2PC BYPASS",
    tagline: "Dual PC — complete bypass, unlimited rage",
    price: 29.99,
    badge: "BEST VALUE",
    badgeType: "gold",
    category: "Bypass",
    description: "Complete dual PC bypass with unlimited rage potential. Bypass VAL 152, VAL 5 and all protections with zero detection risk.",
    features: [
      "Bypass Everything", "Bypass VAL 152", "Bypass VAL 5", "Bypass Popup", "Unlimited Rage Mode",
      "Dual PC Setup", "Complete Isolation", "Maximum Security", "Zero Detection Risk",
      "Full Rage Mode", "No Restrictions", "Bypass ALL Protections", "Maximum Performance",
    ],
    color: "#FFD700", icon: "👑", discordUrl: DISCORD_URL,
    pricing: [
      { label: "Week", usd: "$29.99", vnd: "799k VNĐ" },
      { label: "Monthly", usd: "$69.99", vnd: "1TR699 VNĐ" },
      { label: "Lifetime", usd: "$249.99", vnd: "5TR9 VNĐ" },
    ],
  },
  {
    id: 3,
    name: "INTERNAL",
    tagline: "Premium Valorant enhancement — full features",
    price: 4.99,
    badge: "PREMIUM",
    badgeType: "cyan",
    category: "Internal",
    description: "Premium internal cheat for Valorant. Silent aimbot, full ESP, anti-aim, world ESP and much more. Works on Windows 10 & 11.",
    features: [
      "Skeleton Enemy + Box ESP", "Head Circle + Snapline (FOV)", "Health Bar + Map Radar", "Agent & Weapon Icon",
      "Silent Aimbot + AutoShoot", "Smoothing + No Spread", "Target Bone (Head/Chest)", "FOV RGB + Bullet Trace",
      "Unlock All Skins", "FOV Changer + Third Person", "Spinbot Serversided + Bunnyhop",
      "Anti AFK + RGB Crosshair", "Night Mode + Anti Flash", "Anti Aim (Pitch/Yaw/Spin)",
    ],
    color: "#00D4FF", icon: "⚡", discordUrl: DISCORD_URL,
    pricing: [
      { label: "Day", usd: "$4.99", vnd: "49k VNĐ" },
      { label: "Week", usd: "$9.99", vnd: "299k VNĐ" },
      { label: "Month", usd: "$39.99", vnd: "999k VNĐ" },
      { label: "Lifetime", usd: "$54.99", vnd: "1TR49 VNĐ" },
    ],
  },
  {
    id: 4,
    name: "EMULATOR",
    tagline: "Play VAL without Riot kernel drivers",
    price: 0,
    badge: "OPEN TICKET",
    badgeType: "green",
    category: "Emulator",
    description: "Play Valorant and LoL without Riot kernel drivers. Instant bypass for VAN 152, Val 5 and VAN -102. No reinstall required.",
    features: [
      "Windows 10 & 11 Supported", "No Game Reinstall Required", "No Windows Reinstall Required",
      "No BIOS Flash Required", "No Restart Required",
      "Play VAL / LoL Without Riot Drivers", "Instant Bypass (VAN 152 / Val 5 / VAN -102)",
      "No TPM / Secure Boot / HVCI Needed", "Working For Valorant & LOL", "Included Tool LOL",
    ],
    color: "#00FF87", icon: "🎮", discordUrl: DISCORD_URL,
    pricing: [{ label: "Price", usd: "Open Ticket!" }],
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
      "Internal deep integration", "Maximum performance", "Highest stability",
      "Elite Discord channel", "Dedicated elite support", "All future updates",
    ],
    color: "#C41E00", icon: "🔥", discordUrl: DISCORD_URL,
  },
];
