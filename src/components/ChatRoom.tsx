import React, { useRef, useState, useEffect } from 'react';
import { ref, push, set, query, orderByChild, limitToLast, onValue, serverTimestamp } from 'firebase/database';
import { Loader2, Send } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { ChatMessage } from './ChatMessage';

export const ChatRoom: React.FC = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    const messagesQuery = query(
      messagesRef,
      orderByChild('createdAt'),
      limitToLast(25)
    );

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValue.trim()) return;
    
    const { uid, photoURL, displayName } = auth.currentUser!;
    const messagesRef = ref(db, 'messages');
    const newMessageRef = push(messagesRef);

    await set(newMessageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName
    });

    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isOwnMessage={msg.uid === auth.currentUser?.uid}
              />
            ))}
          </div>
        )}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!formValue.trim()}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};