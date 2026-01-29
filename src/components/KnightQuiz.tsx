"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    question: "Chi era il sovrano più potente durante il Medioevo in Europa?",
    options: ["Un Faraone", "Un Imperatore Romano", "Un Re", "Un Presidente"],
    correctAnswer: "Un Re",
  },
  {
    question: "Qual era la principale funzione di un castello medievale?",
    options: ["Un centro commerciale", "Una scuola", "Una fortezza difensiva", "Un parco divertimenti"],
    correctAnswer: "Una fortezza difensiva",
  },
  {
    question: "Quale evento segna convenzionalmente l'inizio del Medioevo?",
    options: ["La scoperta dell'America", "La caduta dell'Impero Romano d'Occidente", "La Rivoluzione Francese", "La nascita di Cristo"],
    correctAnswer: "La caduta dell'Impero Romano d'Occidente",
  },
  {
    question: "Qual era il sistema sociale dominante nel Medioevo?",
    options: ["Democrazia", "Comunismo", "Feudalesimo", "Capitalismo"],
    correctAnswer: "Feudalesimo",
  },
  {
    question: "Quale fu una delle principali cause della fine del Medioevo?",
    options: ["L'invenzione del telefono", "La scoperta dell'elettricità", "La Peste Nera", "L'invenzione della stampa"],
    correctAnswer: "La Peste Nera",
  },
  {
    question: "Chi erano i cavalieri?",
    options: ["Contadini", "Mercanti", "Guerrieri a cavallo", "Artigiani"],
    correctAnswer: "Guerrieri a cavallo",
  },
  {
    question: "Quale fu il ruolo della Chiesa nel Medioevo?",
    options: ["Solo spirituale", "Solo politico", "Spirituale e politico", "Nessun ruolo"],
    correctAnswer: "Spirituale e politico",
  },
];

const KnightQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    if (!isAnswered) {
      setSelectedAnswer(value);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-800">Risultati del Quiz!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl text-gray-700">Hai risposto correttamente a <span className="font-extrabold text-purple-700">{score}</span> domande su <span className="font-extrabold text-purple-700">{quizQuestions.length}</span>.</p>
          <p className="text-lg text-gray-600">Un vero cavaliere della conoscenza!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleRestartQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full py-3 px-6 transition-colors duration-300 shadow-md"
          >
            Riprova
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-800 mb-2">Quiz del Cavaliere</CardTitle>
        <CardDescription className="text-orange-600">Domanda {currentQuestionIndex + 1} di {quizQuestions.length}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold text-gray-800">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer || ""} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                disabled={isAnswered}
                className={cn(
                  "border-orange-400 text-orange-600 focus:ring-orange-500",
                  isAnswered && option === currentQuestion.correctAnswer && "border-green-500 ring-green-500",
                  isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && "border-red-500 ring-red-500"
                )}
              />
              <Label
                htmlFor={`option-${index}`}
                className={cn(
                  "text-gray-700 cursor-pointer",
                  isAnswered && option === currentQuestion.correctAnswer && "text-green-700 font-bold",
                  isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && "text-red-700 font-bold line-through"
                )}
              >
                {option}
              </Label>
              {isAnswered && option === currentQuestion.correctAnswer && (
                <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
              )}
              {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500 ml-auto" />
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between mt-6">
        {!isAnswered ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 px-5 transition-colors duration-300 shadow-md"
          >
            Invia Risposta
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg py-2 px-5 transition-colors duration-300 shadow-md"
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? "Prossima Domanda" : "Mostra Risultati"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default KnightQuiz;