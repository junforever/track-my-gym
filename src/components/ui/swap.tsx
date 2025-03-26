'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SwapProps {
  initialIcon: React.ReactNode;
  swappedIcon: React.ReactNode;
  callback: (isSwapped: boolean) => void;
}

export function Swap({ initialIcon, swappedIcon, callback }: SwapProps) {
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    callback(!isSwapped);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={handleSwap}
        className="relative rounded-full transition-all duration-300 cursor-pointer"
      >
        <div
          className={`absolute transition-all duration-300 ${
            isSwapped ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
        >
          {initialIcon}
        </div>
        <div
          className={`absolute transition-all duration-300 ${
            isSwapped ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {swappedIcon}
        </div>
      </Button>
    </div>
  );
}
