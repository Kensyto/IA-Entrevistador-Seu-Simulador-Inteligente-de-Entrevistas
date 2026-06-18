'use client';

import { useState, useEffect, useRef } from 'react';
import { getNextQuestion, getFeedback } from '@/lib/interview';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

interface ChatInterfaceProps {
  jobData: { title: string; description: string };
  onComplete: (feedback: string) => void;
}

export default function ChatInterface({ jobData, onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Start interview with first question
    const firstQuestion = getNextQuestion(0, jobData.title);
    setMessages([{ role: 'ai', content: firstQuestion }]);
    setQuestionIndex(1);
  }, [jobData.title]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionIndex, jobData.title);

      if (nextQuestion) {
        setMessages(prev => [...prev, { role: 'ai', content: nextQuestion }]);
        setQuestionIndex(prev => prev + 1);
        setIsTyping(false);
      } else {
        const feedback = getFeedback(jobData, [...messages, { role: 'user', content: userMessage }]);
        onComplete(feedback);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b bg-blue-600 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold">Entrevista em Andamento</h2>
          <p className="text-xs opacity-80">{jobData.title}</p>
        </div>
        <div className="text-sm bg-blue-500 px-3 py-1 rounded-full">
          Questão {questionIndex} de 5
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                m.role === 'ai'
                  ? 'bg-white border text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border p-3 rounded-lg text-gray-400 italic">
              O entrevistador está digitando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Digite sua resposta aqui..."
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-full transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}
