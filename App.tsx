import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatInterface } from './components/ChatInterface';
import { Message, Sender, SolvedError } from './types';
import { sendMessageToGemini, generateErrorTags } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Simulating self-learning database using local state/storage for this session
  const [history, setHistory] = useState<SolvedError[]>([]);

  useEffect(() => {
    // Welcome message
    const welcomeMsg: Message = {
      id: 'welcome',
      text: "স্বাগতম **HemoFix**-এ! \n\nআমি আপনার ব্যক্তিগত এরর ফিক্সিং অ্যাসিস্ট্যান্ট। আমাকে আপনার কোডের এরর বা স্ক্রিনশট দিন, আমি এখনই সমাধান দিচ্ছি।",
      sender: Sender.BOT,
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
  }, []);

  const handleSendMessage = async (text: string, image?: string) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date(),
      image: image
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Simulate "Self Learning" - Retrieving context (Mock logic)
    // In a real app, we would query the backend DB for similar solved errors here.
    
    // 3. Call API
    try {
      const responseText = await sendMessageToGemini(text, image);

      // 4. Add Bot Response
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date(),
        isErrorAnalysis: true
      };
      setMessages(prev => [...prev, botMsg]);

      // 5. Update "Learning" Database if it was an error query
      if (text.length > 10 || image) {
        const tags = await generateErrorTags(text);
        const newSolved: SolvedError = {
          id: Date.now().toString(),
          title: text.substring(0, 40) + (text.length > 40 ? '...' : ''),
          timestamp: new Date(),
          tags: tags
        };
        setHistory(prev => [newSolved, ...prev].slice(0, 5)); // Keep last 5
      }

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "দুঃখিত, সার্ভারে সমস্যা হচ্ছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        sender: Sender.BOT,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="mb-4">
               <h2 className="text-2xl font-bold text-brand-deepPurple mb-1">স্মার্ট এরর সলিউশন</h2>
               <p className="text-gray-600 text-sm">এআই এর মাধ্যমে নিমেষেই সমাধান পান</p>
            </div>
            <ChatInterface 
              messages={messages} 
              isLoading={isLoading} 
              onSendMessage={handleSendMessage} 
            />
          </div>

          {/* Sidebar / Self-Learning History Display */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-brand-orange/20 p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="font-bold text-brand-deepPurple">সম্প্রতি সমাধানকৃত</h3>
              </div>
              
              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-sm text-gray-400 italic text-center py-4">
                    এখনও কোনো ডেটা নেই...
                    <br/><span className="text-xs">সিস্টেম শিখছে</span>
                  </p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <p className="text-sm font-medium text-gray-700 truncate mb-1">{item.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-brand-orange/10 text-brand-darkOrange px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>সিস্টেম স্ট্যাটাস:</span>
                  <span className="flex items-center text-green-600 font-bold">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                    অনলাইন
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;