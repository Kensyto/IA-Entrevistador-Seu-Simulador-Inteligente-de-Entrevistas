'use client';

import { useState } from 'react';
import InterviewSetup from '@/components/InterviewSetup';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'setup' | 'interview' | 'feedback'>('landing');
  const [jobData, setJobData] = useState({ title: '', description: '' });
  const [feedback, setFeedback] = useState('');

  const startSetup = () => setStep('setup');

  const handleSetupComplete = (data: { title: string; description: string }) => {
    setJobData(data);
    setStep('interview');
  };

  const handleInterviewComplete = (interviewFeedback: string) => {
    setFeedback(interviewFeedback);
    setStep('feedback');
  };

  const reset = () => {
    setStep('landing');
    setJobData({ title: '', description: '' });
    setFeedback('');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {step === 'landing' && (
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-bold text-blue-600">IA Entrevistador</h1>
            <p className="text-xl text-gray-600">
              Seu Simulador Inteligente de Entrevistas. Pratique para sua próxima oportunidade de emprego com feedback instantâneo da nossa IA.
            </p>
            <div className="flex justify-center">
              <button
                onClick={startSetup}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
              >
                Começar Simulação
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-bold text-lg mb-2">Simulação Realista</h3>
                <p className="text-gray-600 text-sm">Perguntas adaptadas ao cargo e descrição da vaga fornecida.</p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-bold text-lg mb-2">Feedback Imediato</h3>
                <p className="text-gray-600 text-sm">Receba uma análise detalhada do seu desempenho ao final.</p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-bold text-lg mb-2">Prática Segura</h3>
                <p className="text-gray-600 text-sm">Ambiente sem pressão para você aprimorar suas respostas.</p>
              </div>
            </div>
          </div>
        )}

        {step === 'setup' && (
          <InterviewSetup onComplete={handleSetupComplete} />
        )}

        {step === 'interview' && (
          <ChatInterface jobData={jobData} onComplete={handleInterviewComplete} />
        )}

        {step === 'feedback' && (
          <div className="p-8 space-y-6 text-center">
            <h2 className="text-3xl font-bold text-green-600">Feedback da Entrevista</h2>
            <div className="p-6 bg-gray-50 rounded-lg text-left whitespace-pre-wrap">
              {feedback}
            </div>
            <button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
