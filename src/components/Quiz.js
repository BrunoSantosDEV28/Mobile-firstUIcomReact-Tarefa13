import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    question: "O que é Mobile-First?",
    options: [
      "Desenvolver para desktop antes de mobile",
      "Desenvolver primeiro para mobile",
      "Um tipo de framework",
      "Uma linguagem de programação",
    ],
    answer: "Desenvolver primeiro para mobile",
    justification:
      "Mobile-First é uma abordagem de design que prioriza a experiência em dispositivos móveis.",
  },
  {
    question: "O que é responsividade?",
    options: [
      "Adaptar o layout a diferentes tamanhos de tela",
      "Uma técnica de SEO",
      "Criar sites apenas para desktop",
      "Usar tabelas para layout",
    ],
    answer: "Adaptar o layout a diferentes tamanhos de tela",
    justification:
      "Responsividade permite que o layout de uma página web se adapte a diferentes tamanhos de tela.",
  },
  {
    question: "Qual é a importância da usabilidade?",
    options: [
      "Facilitar a navegação do usuário",
      "Aumentar o tráfego do site",
      "Melhorar o SEO",
      "Gerar mais vendas",
    ],
    answer: "Facilitar a navegação do usuário",
    justification:
      "A usabilidade garante que os usuários consigam interagir com o site de maneira intuitiva.",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showJustification, setShowJustification] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizEnded, setQuizEnded] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowJustification(true);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowJustification(false);
    setSelectedOption("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizEnded(false);
  };

  return (
    <div className="quiz-container">
      {quizEnded ? (
        <div className="result">
          <h2>Você terminou o Quiz!</h2>
          <p>
            Pontuação: {score} de {questions.length}
          </p>
          <button onClick={handleRestartQuiz}>Reiniciar Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== ""}
              >
                {option}
              </button>
            ))}
          </div>
          {showJustification && (
            <div className="justification">
              <p>
                {selectedOption === questions[currentQuestion].answer
                  ? "Correto!"
                  : "Incorreto!"}
              </p>
              <p>Justificativa: {questions[currentQuestion].justification}</p>
            </div>
          )}
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
