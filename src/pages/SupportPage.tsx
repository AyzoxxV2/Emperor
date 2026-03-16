import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, ChevronDown, ExternalLink, Zap, Shield, Cloud, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/content';
import './Pages.scss';

interface Message {
  id: number;
  from: 'user' | 'bot';
  text: string;
  time: string;
}

const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const botReplies = SITE_CONFIG.supportPage.botReplies as Record<string, string>;

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
    { id: 1, from: 'bot', text: SITE_CONFIG.supportPage.botWelcome, time: getTime() }
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
          <div className="badge badge--gold">{SITE_CONFIG.supportPage.badge}</div>
          <h1 className="display-xl">{SITE_CONFIG.supportPage.title} <span className="gold-text">{SITE_CONFIG.supportPage.titleGold}</span></h1>
          <p>{SITE_CONFIG.supportPage.subtitle}</p>
        </motion.div>
      </div>

      <div className="page__container">
        <div className="support-page__layout">
          {/* Chat */}
          <div className="support-page__chat-wrap">
            <div className="support-page__chat-header">
              <img src={SITE_CONFIG.brand.logoGif} alt="Emperor Bot" className="support-page__bot-avatar" />
              <div>
                <div className="support-page__bot-name">{SITE_CONFIG.supportPage.botName}</div>
                <div className="support-page__bot-status"><span className="support-page__online-dot" /> {SITE_CONFIG.supportPage.botStatus}</div>
              </div>
              <a href={SITE_CONFIG.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn--outline support-page__discord-btn">
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
                      <img src={SITE_CONFIG.brand.logoGif} alt="bot" className="support-page__msg-avatar" />
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
                  <img src={SITE_CONFIG.brand.logoGif} alt="bot" className="support-page__msg-avatar" />
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
              <a href={SITE_CONFIG.links.discord} target="_blank" rel="noopener noreferrer" className="support-page__link-card">
                <div className="support-page__link-card-icon">💬</div>
                <div>
                  <div className="support-page__link-card-name">{SITE_CONFIG.supportPage.discordCardName}</div>
                  <div className="support-page__link-card-desc">{SITE_CONFIG.supportPage.discordCardDesc}</div>
                </div>
                <ExternalLink size={14} />
              </a>
              <a href={`mailto:${SITE_CONFIG.links.supportEmail}`} className="support-page__link-card">
                <div className="support-page__link-card-icon">📧</div>
                <div>
                  <div className="support-page__link-card-name">{SITE_CONFIG.supportPage.emailCardName}</div>
                  <div className="support-page__link-card-desc">{SITE_CONFIG.supportPage.emailCardDesc}</div>
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
