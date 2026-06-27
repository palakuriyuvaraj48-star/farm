import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const AICopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: "Hello! I'm your AI Copilot. How can I assist you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: "I'm currently running in demo mode. In production, I would connect to the EduSphere NLP backend to answer that!" 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <Card style={{ position: 'fixed', bottom: '90px', right: '30px', width: '350px', height: '500px', display: 'flex', flexDirection: 'column', zIndex: 1000, padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white' }}>
            <Typography variant="h4" style={{ color: 'white', marginBottom: '0.25rem' }}>EduSphere AI Copilot</Typography>
            <Typography style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>Ask me anything about your courses, research, or university policies.</Typography>
          </div>
          
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-neutral-light)' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', 
                background: msg.sender === 'user' ? 'var(--color-primary)' : 'white', 
                color: msg.sender === 'user' ? 'white' : 'inherit',
                padding: '1rem', 
                borderRadius: msg.sender === 'user' ? '8px 8px 0 8px' : '8px 8px 8px 0', 
                boxShadow: 'var(--shadow-sm)', 
                maxWidth: '85%' 
              }}>
                <Typography style={{ fontSize: '0.9rem' }}>{msg.text}</Typography>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem', borderRadius: '8px 8px 8px 0', boxShadow: 'var(--shadow-sm)' }}>
                <Loader2 className="animate-spin text-gray-400" size={16} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid var(--color-neutral-border)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..." 
                style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-full)', outline: 'none' }} 
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', color: 'white', border: 'none', cursor: isTyping ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isTyping ? 0.7 : 1 }}
              >
                &uarr;
              </button>
            </div>
          </div>
        </Card>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </button>
    </>
  );
};

