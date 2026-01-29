"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

interface MemoryCard {
  id: string;
  value: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardContent = [
  { value: "Cavaliere", image: "/placeholder.svg" }, // Using placeholder for now
  { value: "Castello", image: "/placeholder.svg" },
  { value: "Spada", image: "/placeholder.svg" },
  { value: "Scudo", image: "/placeholder.svg" },
  { value: "Corona", image: "/placeholder.svg" },
  { value: "Drago", image: "/placeholder.svg" },
];

const shuffleArray = <T extends any[]>(array: T): T => {
  const newArray = [...array] as T;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const initializeCards = (): MemoryCard[] => {
  const initialCards: MemoryCard[] = [];
  cardContent.forEach((content, index) => {
    initialCards.push({
      id: `A-${index}`,
      value: content.value,
      image: content.image,
      isFlipped: false,
      isMatched: false,
    });
    initialCards.push({
      id: `B-${index}`,
      value: content.value,
      image: content.image,
      isFlipped: false,
      isMatched: false,
    });
  });
  return shuffleArray(initialCards);
};

const MedievalMemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>(initializeCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Indices of flipped cards
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameLocked, setIsGameLocked] = useState(false); // To prevent rapid clicks

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsGameLocked(true);
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
        setIsGameLocked(false);
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsGameLocked(false);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (isGameLocked || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
  };

  const handleRestartGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameLocked(false);
  };

  const allCardsMatched = matchedPairs === cardContent.length;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-purple-800 mb-2">Memory Game Medievale</CardTitle>
        <CardDescription className="text-purple-600">Abbina le coppie di carte medievali!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-around items-center text-lg font-semibold text-gray-700">
          <span>Mosse: <span className="text-purple-700">{moves}</span></span>
          <span>Coppie Trovate: <span className="text-purple-700">{matchedPairs} / {cardContent.length}</span></span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={cn(
                "relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg shadow-md flex items-center justify-center transform transition-all duration-300",
                "bg-purple-300 cursor-pointer hover:scale-105",
                (card.isFlipped || card.isMatched) && "bg-white",
                card.isMatched && "border-2 border-green-500",
                isGameLocked && !card.isFlipped && "cursor-not-allowed opacity-70"
              )}
              onClick={() => handleCardClick(index)}
            >
              {(card.isFlipped || card.isMatched) ? (
                <span className="text-xl font-bold text-purple-800 select-none">{card.value}</span>
              ) : (
                <span className="text-3xl text-purple-600 select-none">?</span>
              )}
            </div>
          ))}
        </div>
        {allCardsMatched && (
          <div className="mt-4 p-3 rounded-lg text-center font-bold text-lg bg-green-100 text-green-700">
            Complimenti! Hai trovato tutte le coppie in {moves} mosse!
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center mt-6">
        <Button
          onClick={handleRestartGame}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-md flex items-center"
        >
          <RefreshCcw className="h-5 w-5 mr-2" /> Rigioca
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedievalMemoryGame;