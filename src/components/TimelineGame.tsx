"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, GripVertical } from "lucide-react";

interface TimelineEvent {
  id: string;
  year: number;
  description: string;
}

const medievalEvents: TimelineEvent[] = [
  { id: "event1", year: 476, description: "Caduta dell'Impero Romano d'Occidente" },
  { id: "event2", year: 800, description: "Incoronazione di Carlo Magno" },
  { id: "event3", year: 1066, description: "Battaglia di Hastings" },
  { id: "event4", year: 1096, description: "Inizio della Prima Crociata" },
  { id: "event5", year: 1347, description: "Arrivo della Peste Nera in Europa" },
  { id: "event6", year: 1453, description: "Caduta di Costantinopoli" },
];

// Shuffle array function (Fisher-Yates)
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const TimelineGame = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => shuffleArray(medievalEvents));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<TimelineEvent | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: TimelineEvent) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: TimelineEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newEvents = [...events];
    const draggedIndex = newEvents.findIndex((item) => item.id === draggedItem.id);
    const targetIndex = newEvents.findIndex((item) => item.id === targetItem.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove the dragged item
    const [removed] = newEvents.splice(draggedIndex, 1);
    // Insert it at the target position
    newEvents.splice(targetIndex, 0, removed);

    setEvents(newEvents);
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setEvents(shuffleArray(medievalEvents));
    setIsSubmitted(false);
    setDraggedItem(null);
  };

  const isCorrectOrder = () => {
    for (let i = 0; i < events.length - 1; i++) {
      if (events[i].year > events[i + 1].year) {
        return false;
      }
    }
    return true;
  };

  const correct = isSubmitted && isCorrectOrder();

  return (
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-green-100 to-teal-100 rounded-xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-teal-800 mb-2">Linea del Tempo Reale</CardTitle>
        <CardDescription className="text-teal-600">Trascina gli eventi nell'ordine cronologico corretto!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              draggable={!isSubmitted}
              onDragStart={(e) => handleDragStart(e, event)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, event)}
              className={cn(
                "flex items-center p-3 rounded-lg border-2 border-teal-300 bg-white shadow-sm cursor-grab",
                isSubmitted && (event.year === medievalEvents.find(e => e.id === event.id)?.year ? "border-green-500" : "border-red-500"),
                draggedItem?.id === event.id && "opacity-50 border-dashed"
              )}
            >
              {!isSubmitted && <GripVertical className="h-5 w-5 text-teal-500 mr-3" />}
              <span className="font-semibold text-gray-800 mr-2">{event.year}:</span>
              <span className="text-gray-700 flex-grow">{event.description}</span>
              {isSubmitted && (
                event.year === medievalEvents.find(e => e.id === event.id)?.year ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                )
              )}
            </div>
          ))}
        </div>
        {isSubmitted && (
          <div className={cn(
            "mt-4 p-3 rounded-lg text-center font-bold text-lg",
            correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {correct ? "Complimenti! Ordine Corretto!" : "Non è l'ordine corretto. Riprova!"}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center mt-6 space-x-4">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-md"
          >
            Verifica Ordine
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

export default TimelineGame;