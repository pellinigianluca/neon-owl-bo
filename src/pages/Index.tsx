"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 leading-tight">
          Scopri il Medioevo: Avventura e Conoscenza ti Aspettano!
        </h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Immergiti in un viaggio epico tra cavalieri, castelli e leggende. Esplora la storia con i nostri giochi interattivi e metti alla prova le tue abilità!
        </p>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Link to="/medieval-games" className="flex items-center justify-center">
            <BookOpenText className="mr-3 h-6 w-6" /> Inizia la Tua Avventura Medievale
          </Link>
        </Button>
      </div>
      <div className="mt-8">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;