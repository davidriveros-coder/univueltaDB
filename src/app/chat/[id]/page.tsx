'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { getTripById } from '@/lib/services/trips';
import type { ChatMessage, Trip } from '@/lib/types';
import { getUserTrips } from '@/lib/client/userTrips';
import { appendAutoReply, ensureConversationStarted, sendMessage } from '@/lib/client/chat';

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userTrip = getUserTrips().find((t) => t.id === params.id);
    if (userTrip) { setTrip(userTrip); setMessages(ensureConversationStarted(userTrip)); return; }
    getTripById(params.id).then((found) => {
      if (found) { setTrip(found); setMessages(ensureConversationStarted(found)); }
    });
  }, [params.id]);

  useEffect(() => {
    areaRef.current?.scrollTo({ top: areaRef.current.scrollHeight });
  }, [messages]);

  if (!trip) return null;

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages(sendMessage(trip!.id, text));
    setDraft('');
    setTimeout(() => setMessages(appendAutoReply(trip!.id)), 1200);
  }

  return (
    <div className="screen" id="s-chat">
      <div className="sb" style={{ background: 'var(--blue-d)', color: '#fff', padding: '0 18px' }}>
        <span>9:41</span>
        <div className="sb-ic">
          <span>●●●</span>
          <span>🔋</span>
        </div>
      </div>
      <div className="chat-hdr">
        <button className="back" onClick={() => router.back()}>
          ←
        </button>
        <Avatar initials={trip.driver.initials} avatarClass={trip.driver.avatarClass} size={40} fontSize={14} />
        <div className="chat-hdr-info">
          <div className="chat-hdr-name">{trip.driver.fullName}</div>
          <div className="chat-hdr-status">
            <div className="online-dot" />
            En línea · UniVuelta
          </div>
        </div>
        <span className="badge b-blue" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: 11 }}>
          {trip.driver.badgeIcon} {trip.driver.verificationType.split(' ')[0]}
        </span>
      </div>
      <div className="chat-trust">🛡️ Conversación protegida dentro de la red UniVuelta</div>
      <div className="chat-area" ref={areaRef}>
        {messages.map((m) => (
          <div className={`msg msg-${m.from}`} key={m.id}>
            <div className="msg-bubble">{m.text}</div>
            <div className="msg-time">{m.time}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <textarea
          className="chat-inp"
          rows={1}
          placeholder="Escribe un mensaje..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className="chat-send" onClick={handleSend}>
          ↑
        </button>
      </div>
    </div>
  );
}
