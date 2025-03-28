'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SwapProps {
  initialIcon: React.ReactNode;
  initialIconTitle: string;
  swappedIcon: React.ReactNode;
  swappedIconTitle: string;
  initialState?: boolean;
  callback: (isSwapped: boolean) => void;
}

export function Swap({
  initialIcon,
  initialIconTitle,
  swappedIcon,
  swappedIconTitle,
  initialState,
  callback,
}: SwapProps) {
  const [isSwapped, setIsSwapped] = useState(initialState || false);

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
        title={isSwapped ? swappedIconTitle : initialIconTitle}
        aria-label={isSwapped ? swappedIconTitle : initialIconTitle}
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
