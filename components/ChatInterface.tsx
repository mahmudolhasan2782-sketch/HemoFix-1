import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string, image?: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading) return;
    
    onSendMessage(inputText, selectedImage || undefined);
    setInputText('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-xl border border-brand-orange/20 overflow-hidden">
      
      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 opacity-60">
            <svg className="w-24 h-24 mb-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M17.636 17.636l-.707-.707M12 21v-1M4.364 17.636l.707-.707M3 12h1m1.636-6.364l.707.707" />
            </svg>
            <p className="text-xl font-bold">কিভাবে আপনাকে সাহায্য করতে পারি?</p>
            <p className="text-sm">এরর কোড পেস্ট করুন বা স্ক্রিনশট আপলোড করুন</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
              msg.sender === Sender.USER 
                ? 'bg-brand-deepPurple text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              {/* Image in message */}
              {msg.image && (
                <img src={msg.image} alt="User upload" className="max-w-full h-auto rounded-lg mb-3 border border-white/20" />
              )}
              
              {/* Text/Markdown content */}
              <div className={`prose prose-sm max-w-none ${msg.sender === Sender.USER ? 'prose-invert' : ''}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              
              <span className={`text-[10px] block mt-2 ${msg.sender === Sender.USER ? 'text-gray-300' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="text-xs text-gray-500 ml-2">সমাধান খোঁজা হচ্ছে...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-brand-cream border-t border-gray-200 p-4">
        {selectedImage && (
          <div className="flex items-center gap-2 mb-2 p-2 bg-white rounded-lg border border-brand-orange/30 w-fit">
            <img src={selectedImage} alt="Preview" className="h-12 w-12 object-cover rounded" />
            <span className="text-xs text-gray-600 truncate max-w-[150px]">Image selected</span>
            <button 
              onClick={() => setSelectedImage(null)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              ✕
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-brand-deepPurple bg-white border border-brand-deepPurple/20 rounded-xl hover:bg-brand-deepPurple hover:text-white transition-all shadow-sm"
            title="ছবি আপলোড করুন"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার সমস্যা বা কোড এখানে লিখুন..."
            className="flex-1 p-3 bg-white border border-brand-deepPurple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none h-14 max-h-32 text-gray-700 shadow-inner"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <button
            type="submit"
            disabled={isLoading || (!inputText.trim() && !selectedImage)}
            className="p-3 bg-brand-orange text-white rounded-xl hover:bg-brand-darkOrange transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};