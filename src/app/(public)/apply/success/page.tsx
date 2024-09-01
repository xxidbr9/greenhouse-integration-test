"use client";

import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    handleConfetti();
  }, []);

  return (
    <div className="relative w-full">
      <Image
        className="absolute top-0 z-0 -translate-y-1/2 select-none"
        src={"/bg-back.png"}
        width={1000}
        height={1000}
        alt="back bg"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -inset-4 bg-purple-100 rounded-full -z-10"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Amazing!</h1>
          <p className="text-xl font-semibold text-gray-800">
            Congratulations. Your Application are being in process
          </p>
          <p className="text-sm text-gray-500">Explore other jobs</p>
          <Button asChild>
            <Link href={"/position"}>Back</Link>
          </Button>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="absolute right-1/4 bottom-1/3 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute left-1/3 bottom-1/4 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute right-1/3 top-1/3 w-3 h-1 bg-yellow-400 rounded-full transform rotate-45"></div>
          <div className="absolute left-2/3 top-1/4 w-1 h-3 bg-purple-400 rounded-full transform -rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
