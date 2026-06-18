export function getNextQuestion(index: number, jobTitle: string): string {
  const questions = [
    `Olá! Sou seu entrevistador IA. Vamos começar a entrevista para a posição de ${jobTitle}. Pode me contar um pouco sobre sua experiência relevante para este cargo?`,
    "Quais são seus principais pontos fortes e como eles se aplicam a esta vaga?",
    "Pode me descrever um desafio técnico ou profissional que você enfrentou recentemente e como o resolveu?",
    "Por que você está interessado em trabalhar nesta empresa especificamente?",
    "Onde você se vê profissionalmente daqui a 5 anos?",
  ];

  if (index < questions.length) {
    return questions[index];
  }
  return "";
}

export function getFeedback(jobData: { title: string; description: string }, history: { role: string; content: string }[]): string {
  const wordCount = history.filter(m => m.role === 'user').reduce((acc, m) => acc + m.content.split(' ').length, 0);

  let feedback = `Análise da Entrevista para: ${jobData.title}\n\n`;

  if (wordCount < 50) {
    feedback += "🔴 Suas respostas foram muito curtas. Em uma entrevista real, tente elaborar mais e fornecer exemplos concretos (método STAR).\n\n";
  } else if (wordCount < 150) {
    feedback += "🟡 Bom trabalho, mas você poderia detalhar ainda mais suas conquistas técnicas e impacto nos projetos.\n\n";
  } else {
    feedback += "🟢 Excelente nível de detalhamento! Você demonstrou boa capacidade de comunicação e profundidade em suas respostas.\n\n";
  }

  feedback += "Sugestões de Melhoria:\n";
  feedback += "1. Conecte mais suas habilidades técnicas com as necessidades descritas na vaga.\n";
  feedback += "2. Pratique a estruturação de suas respostas para serem mais objetivas e impactantes.\n";
  feedback += "3. Demonstre mais entusiasmo sobre a cultura da empresa mencionada na descrição.";

  return feedback;
}
