"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, GripVertical } from "lucide-react";

interface Character {
  id: string;
  name: string;
  description: string;
}

const medievalCharacters: Character[] = [
  { id: "char1", name: "Carlo Magno", description: "Re dei Franchi e Imperatore del Sacro Romano Impero." },
  { id: "char2", name: "Giovanna d'Arco", description: "Eroina francese che guidò l'esercito durante la Guerra dei Cent'anni." },
  { id: "char3", name: "Riccardo Cuor di Leone", description: "Re d'Inghilterra, famoso per le sue imprese durante la Terza Crociata." },
  { id: "char4", name: "Federico II", description: "Imperatore del Sacro Romano Impero, noto per la sua cultura e tolleranza." },
  { id: "char5", name: "Dante Alighieri", description: "Poeta italiano, autore della Divina Commedia." },
];

// Shuffle array function (Fisher-Yates)
const shuffleArray = <T extends any[]>(array: T): T => {
  const newArray = [...array] as T;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CharacterMatchGame = () => {
  const [characters, setCharacters] = useState<Character[]>(() => shuffleArray(medievalCharacters));
  const [descriptions, setDescriptions] = useState<Character[]>(() => shuffleArray(medievalCharacters));
  const [matches, setMatches] = useState<Record<string, string>>({}); // { characterId: descriptionId }
  const [draggedCharacter, setDraggedCharacter] = useState<Character | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, character: Character) => {
    setDraggedCharacter(character);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetDescription: Character) => {
    e.preventDefault();
    if (!draggedCharacter || isSubmitted) return;

    setMatches((prevMatches) => ({
      ...prevMatches,
      [draggedCharacter.id]: targetDescription.id,
    }));
    setDraggedCharacter(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setCharacters(shuffleArray(medievalCharacters));
    setDescriptions(shuffleArray(medievalCharacters));
    setMatches({});
    setDraggedCharacter(null);
    setIsSubmitted(false);
  };

  const getMatchStatus = (characterId: string, descriptionId: string) => {
    if (!isSubmitted) return null;
    const originalCharacter = medievalCharacters.find(c => c.id === characterId);
    const originalDescription = medievalCharacters.find(d => d.id === descriptionId);
    return originalCharacter?.id === originalDescription?.id;
  };

  const allMatchedCorrectly = () => {
    if (Object.keys(matches).length !== medievalCharacters.length) return false;
    return Object.entries(matches).every(([charId, descId]) => getMatchStatus(charId, descId));
  };

  const correctCount = Object.entries(matches).filter(([charId, descId]) => getMatchStatus(charId, descId)).length;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-800 mb-2">Abbina il Personaggio</CardTitle>
        <CardDescription className="text-indigo-600">Trascina i personaggi sulle loro descrizioni corrette!</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Personaggi</h3>
          {characters.map((char) => (
            <div
              key={char.id}
              draggable={!isSubmitted && !Object.keys(matches).includes(char.id)}
              onDragStart={(e) => handleDragStart(e, char)}
              className={cn(
                "flex items-center p-3 rounded-lg border-2 border-indigo-300 bg-white shadow-sm",
                !isSubmitted && !Object.keys(matches).includes(char.id) ? "cursor-grab" : "cursor-not-allowed opacity-70",
                draggedCharacter?.id === char.id && "opacity-50 border-dashed"
              )}
            >
              <GripVertical className="h-5 w-5 text-indigo-500 mr-3" />
              <span className="font-semibold text-gray-800">{char.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Descrizioni</h3>
          {descriptions.map((desc) => {
            const matchedCharId = Object.keys(matches).find(charId => matches[charId] === desc.id);
            const matchedChar = matchedCharId ? medievalCharacters.find(c => c.id === matchedCharId) : null;
            const isCorrect = matchedCharId ? getMatchStatus(matchedCharId, desc.id) : null;

            return (
              <div
                key={desc.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, desc)}
                className={cn(
                  "flex flex-col p-3 rounded-lg border-2 border-blue-300 bg-white shadow-sm min-h-[80px] justify-center relative",
                  isSubmitted && isCorrect === true && "border-green-500",
                  isSubmitted && isCorrect === false && "border-red-500",
                  !matchedChar && "border-dashed border-blue-400"
                )}
              >
                {matchedChar ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-gray-800">{matchedChar.name}</span>
                    {isSubmitted && (
                      isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )
                    )}
                  </div>
                ) : (
                  <span className="text-gray-600 italic">Trascina qui un personaggio...</span>
                )}
                <p className="text-sm text-gray-700 mt-1">{desc.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center mt-6 space-y-4">
        {isSubmitted && (
          <div className={cn(
            "mt-4 p-3 rounded-lg text-center font-bold text-lg w-full",
            allMatchedCorrectly() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {allMatchedCorrectly() ? "Complimenti! Tutti gli abbinamenti sono corretti!" : `Hai abbinato correttamente ${correctCount} su ${medievalCharacters.length} personaggi. Riprova!`}
          </div>
        )}
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(matches).length !== medievalCharacters.length}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-md"
          >
            Verifica Abbinamenti
          </Button>
        ) : (
          <Button
            onClick={handleRestart}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-md"
          >
            Riprova
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CharacterMatchGame;