import React from 'react';
import { formatRelative } from 'date-fns';

interface Message {
  text: string;
  uid: string;
  photoURL: string;
  createdAt: number;
  displayName: string;
}

interface Props {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<Props> = ({ message, isOwnMessage }) => {
  const timestamp = message.createdAt ? new Date(message.createdAt) : new Date();
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end`}>
        <img
          src={message.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.uid}`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className={`mx-2 ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2 max-w-xs`}>
          <p className="text-sm font-medium mb-1">{message.displayName}</p>
          <p className="text-sm">{message.text}</p>
          <p className="text-xs mt-1 opacity-75">
            {formatRelative(timestamp, new Date())}
          </p>
        </div>
      </div>
    </div>
  );
};