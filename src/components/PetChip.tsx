import React from 'react';

interface PetChipProps {
  label: string;
  className?: string;
}

export function PetChip({ label, className = '' }: PetChipProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-body font-bold bg-[#ffdbc8] text-[#8e4a1a] shadow-sm ${className}`}>
      {label}
    </span>
  );
}
