import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, ChevronDown, ExternalLink, Zap, Shield, Cloud, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Pages.scss';

interface Message {
  id: number;
  from: 'user' | 'bot';
  text: string;
  time: string;
}

const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const botReplies: Record<string, string> = {
  default: "Thanks for reaching out! Our support team will get back to you within 2 hours. In the meantime, check our FAQ below or join our Discord server for instant community help.",
  launch: "To fix launcher issues: 1) Run as Administrator 2) Disable antivirus temporarily 3) Reinstall Emperor. If it persists, share your error log in Discord and we'll fix it fast.",
  fps: "For FPS issues: make sure Booster PRO is enabled and set to 'Gaming Mode'. Check that no background apps are stealing resources. Our AI optimizer runs automatically when you launch a game.",
  cloud: "Cloud saves sync automatically every 5 minutes while a game is running. To force a sync, go to Settings → Cloud → Sync Now. Make sure you're logged in with the same account.",
  billing: "For billing questions, email billing@emperor.gg or open a ticket in our Discord. We have a 30-day money-back guarantee — no questions asked.",
  discord: "Join our Discord server: discord.gg/TjXbYS9DZu — our community and support team are active 24/7. Most issues get solved within minutes there!",
  hello: "Hey! 👋 Welcome to Emperor Support. How can I help you today? You can ask me about the launcher, FPS, cloud saves, billing, or anything else.",
  hi: "Hey! 👋 Welcome to Emperor Support. How can I help you today?",
  help: "Of course! I'm here to help. Common topics: launcher issues, FPS optimization, cloud saves, billing, or Discord. What's your question?",
};

const getBotReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return botReplies.hi;
  if (lower.includes('help')) return botReplies.help;
  if (lower.includes('launch') || lower.includes('start') || lower.includes('open')) return botReplies.launch;
  if (lower.includes('fps') || lower.includes('lag') || lower.includes('slow') || lower.includes('performance')) return botReplies.fps;
  if (lower.includes('cloud') || lower.includes('save')) return botReplies.cloud;
  if (lower.includes('bill') || lower.includes('refund') || lower.includes('payment') || lower.includes('cancel')) return botReplies.billing;
  if (lower.includes('discord')) return botReplies.discord;
  return botReplies.default;
};

const faqItems = [
  { icon: <Zap size={16} />, q: 'How do I activate Booster PRO?', a: 'After purchase, go to Settings → Optimizer → Enable Booster PRO. It activates automatically when you launch any supported game.' },
  { icon: <Cloud size={16} />, q: 'How do cloud saves work?', a: 'Emperor automatically detects and backs up your save files every 5 minutes. Access them from any PC by signing into your account.' },
  { icon: <Monitor size={16} />, q: 'Emperor is not launching on my PC', a: 'Try running as Administrator, disabling antivirus temporarily, and making sure you have .NET 6 and VC++ Redistributable installed.' },
  { icon: <Shield size={16} />, q: 'Is Emperor safe to use?', a: 'Absolutely. Emperor never modifies game files, doesn\'t collect data without consent, and is scanned weekly for malware by third-party auditors.' },
];

const SupportPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'bot', text: "👋 Welcome to Emperor Support! I'm your AI assistant. Ask me anything — or join our Discord for live help.", time: getTime() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: input, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    setTyping(false);
    const botMsg: Message = { id: Date.now() + 1, from: 'bot', text: getBotReply(userInput), time: getTime() };
    setMessages(prev => [...prev, botMsg]);
  };

  const quickReplies = ['Launcher issue', 'FPS problem', 'Cloud saves', 'Billing', 'Discord link'];

  return (
    <div className="page">
      <div className="page__hero">
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="badge badge--gold">24/7 Support</div>
          <h1 className="display-xl">We've got you <span className="gold-text">covered</span></h1>
          <p>AI support available instantly. Human support in under 2 hours.</p>
        </motion.div>
      </div>

      <div className="page__container">
        <div className="support-page__layout">
          {/* Chat */}
          <div className="support-page__chat-wrap">
            <div className="support-page__chat-header">
              <img src="/emperor/emperor_bot_avatar_ani.gif" alt="Emperor Bot" className="support-page__bot-avatar" />
              <div>
                <div className="support-page__bot-name">Emperor Support Bot</div>
                <div className="support-page__bot-status"><span className="support-page__online-dot" /> Online — replies instantly</div>
              </div>
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="btn btn--outline support-page__discord-btn">
                <ExternalLink size={13} /> Discord
              </a>
            </div>

            <div className="support-page__messages">
              <AnimatePresence>
                {messages.map(msg => (
                  <motion.div key={msg.id}
                    className={`support-page__msg support-page__msg--${msg.from}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.from === 'bot' && (
                      <img src="/emperor/emperor_bot_avatar_ani.gif" alt="bot" className="support-page__msg-avatar" />
                    )}
                    {msg.from === 'user' && isAuthenticated && user && (
                      <img src={user.avatar} alt="you" className="support-page__msg-avatar support-page__msg-avatar--user" />
                    )}
                    <div className="support-page__msg-bubble">
                      <p>{msg.text}</p>
                      <span className="support-page__msg-time">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div className="support-page__msg support-page__msg--bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <img src="/emperor/emperor_bot_avatar_ani.gif" alt="bot" className="support-page__msg-avatar" />
                  <div className="support-page__typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="support-page__quick-replies">
              {quickReplies.map(qr => (
                <button key={qr} className="support-page__quick-reply" onClick={() => { setInput(qr); }}>
                  {qr}
                </button>
              ))}
            </div>

            <div className="support-page__input-wrap">
              <input
                className="support-page__input"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button className="support-page__send" onClick={sendMessage} disabled={!input.trim()}>
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Right — FAQ + links */}
          <div className="support-page__right">
            <div className="support-page__section">
              <h3 className="support-page__section-title">
                <MessageCircle size={16} /> Common Questions
              </h3>
              {faqItems.map((item, i) => (
                <div key={i} className={`support-page__faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="support-page__faq-icon">{item.icon}</span>
                    <span>{item.q}</span>
                    <ChevronDown size={14} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: '0.25s', marginLeft: 'auto' }} />
                  </button>
                  {openFaq === i && <p>{item.a}</p>}
                </div>
              ))}
            </div>

            <div className="support-page__section">
              <h3 className="support-page__section-title">🔗 Get Help Faster</h3>
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="support-page__link-card">
                <div className="support-page__link-card-icon">💬</div>
                <div>
                  <div className="support-page__link-card-name">Discord Server</div>
                  <div className="support-page__link-card-desc">50K+ members • Live support</div>
                </div>
                <ExternalLink size={14} />
              </a>
              <a href="mailto:support@emperor.gg" className="support-page__link-card">
                <div className="support-page__link-card-icon">📧</div>
                <div>
                  <div className="support-page__link-card-name">Email Support</div>
                  <div className="support-page__link-card-desc">support@emperor.gg • &lt; 2h reply</div>
                </div>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
