
import React from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveformProps {
  isActive?: boolean;
  className?: string;
}

const AudioWaveform = ({ isActive = false, className }: AudioWaveformProps) => {
  return (
    <div className={cn("flex items-end gap-1 h-12", className)}>
      {[1, 2, 3, 4, 5].map((bar) => (
        <div
          key={bar}
          className={cn(
            "w-2 bg-kuku-purple rounded-full",
            isActive 
              ? `animate-waveform-${bar} h-4 md:h-8` 
              : "h-2 md:h-4",
            bar % 2 === 0 ? "bg-kuku-blue" : "bg-kuku-purple"
          )}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
