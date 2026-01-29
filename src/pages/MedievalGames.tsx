"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import KnightQuiz from "@/components/KnightQuiz"; // Import the new KnightQuiz component

const MedievalGames = () => {
  const [showQuiz, setShowQuiz] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showQuiz ? (
            <div className="md:col-span-2 lg:col-span-3 flex justify-center">
              <KnightQuiz />
            </div>
          ) : (
            <>
              <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orange-800">Quiz del Cavaliere</CardTitle>
                  <CardDescription className="text-orange-600">Metti alla prova le tue conoscenze!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Rispondi a domande sulla vita dei cavalieri, i castelli e gli eventi chiave del Medioevo.</p>
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 transition-colors duration-300"
                  >
                    Gioca Ora
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-teal-800">Linea del Tempo Reale</CardTitle>
                  <CardDescription className="text-teal-600">Ordina gli eventi storici!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Trascina e rilascia gli eventi nella loro corretta sequenza cronologica.</p>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg py-2 transition-colors duration-300">
                    Gioca Ora
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-800">Abbina il Personaggio</CardTitle>
                  <CardDescription className="text-indigo-600">Chi è chi nel Medioevo?</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Abbina i nomi dei personaggi medievali alle loro descrizioni o immagini.</p>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg py-2 transition-colors duration-300">
                    Gioca Ora
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedievalGames;