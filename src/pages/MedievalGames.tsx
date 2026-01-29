"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TimelineGame from "@/components/TimelineGame";
import CharacterMatchGame from "@/components/CharacterMatchGame";
import MedievalMemoryGame from "@/components/MedievalMemoryGame";

// Shuffle array function (Fisher-Yates)
const shuffleArray = <T extends any[]>(array: T): T => {
  const newArray = [...array] as T;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const gameOptions = [
  {
    id: "memory",
    title: "Memory Game Medievale",
    description: "Metti alla prova la tua memoria! Abbina le coppie di carte con temi medievali e scopri quanto sei bravo a ricordare.",
    buttonText: "Gioca Ora",
    bgColor: "from-purple-100 to-pink-100",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    titleColor: "text-purple-800",
    descriptionColor: "text-purple-600",
  },
  {
    id: "timeline",
    title: "Linea del Tempo Reale",
    description: "Ordina gli eventi storici! Trascina e rilascia gli eventi nella loro corretta sequenza cronologica.",
    buttonText: "Gioca Ora",
    bgColor: "from-green-100 to-teal-100",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    titleColor: "text-teal-800",
    descriptionColor: "text-teal-600",
  },
  {
    id: "character-match",
    title: "Abbina il Personaggio",
    description: "Chi è chi nel Medioevo? Abbina i nomi dei personaggi medievali alle loro descrizioni o immagini.",
    buttonText: "Gioca Ora",
    bgColor: "from-blue-100 to-indigo-100",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    titleColor: "text-indigo-800",
    descriptionColor: "text-indigo-600",
  },
];

const MedievalGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [shuffledGameOptions, setShuffledGameOptions] = useState(() => shuffleArray(gameOptions));

  // Re-shuffle game options when returning to the main game selection
  useEffect(() => {
    if (activeGame === null) {
      setShuffledGameOptions(shuffleArray(gameOptions));
    }
  }, [activeGame]);

  const renderGame = () => {
    switch (activeGame) {
      case "memory":
        return <MedievalMemoryGame />;
      case "timeline":
        return <TimelineGame />;
      case "character-match":
        return <CharacterMatchGame />;
      default:
        return (
          <>
            {shuffledGameOptions.map((game) => (
              <Card key={game.id} className={cn("bg-gradient-to-br rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300", game.bgColor)}>
                <CardHeader>
                  <CardTitle className={cn("text-2xl font-bold", game.titleColor)}>{game.title}</CardTitle>
                  <CardDescription className={cn(game.descriptionColor)}>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setActiveGame(game.id)}
                    className={cn("w-full text-white font-semibold rounded-lg py-2 transition-colors duration-300", game.buttonColor)}
                  >
                    {game.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" className="rounded-full px-4 py-2 text-purple-700 border-purple-300 hover:bg-purple-100 transition-all duration-300">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla Home
            </Link>
          </Button>
          <h1 className="text-5xl font-extrabold text-purple-800 text-center flex-grow">
            Giochi sul Medioevo
          </h1>
          <div className="w-24"></div> {/* Placeholder for alignment */}
        </div>

        <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
          Benvenuto nella nostra sezione di giochi divertenti per esplorare la storia affascinante del Medioevo! Scegli un gioco e inizia a imparare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {activeGame && (
            <div className="w-full flex justify-center mb-6 md:col-span-2 lg:col-span-3">
              <Button
                onClick={() => setActiveGame(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-md"
              >
                Torna ai Giochi
              </Button>
            </div>
          )}
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

export default MedievalGames;