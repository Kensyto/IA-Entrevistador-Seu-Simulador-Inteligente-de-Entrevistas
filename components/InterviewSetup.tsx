'use client';

import { useState } from 'react';

interface InterviewSetupProps {
  onComplete: (data: { title: string; description: string }) => void;
}

export default function InterviewSetup({ onComplete }: InterviewSetupProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onComplete({ title, description });
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Configuração da Entrevista</h2>
      <p className="text-gray-600">Conte-nos sobre a vaga para a qual você deseja praticar.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Cargo Desejado
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Ex: Desenvolvedor Frontend Senior"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição da Vaga
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition h-32"
            placeholder="Cole aqui a descrição da vaga..."
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
            Iniciar Entrevista
          </button>
        </div>
      </form>
    </div>
  );
}
