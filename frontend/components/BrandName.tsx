import React from 'react';

interface BrandNameProps {
  className?: string;
}

export default function BrandName({ className = '' }: BrandNameProps) {
  return (
    <span className={className}>
      <span className="text-white">SCORE</span>
      <span className="text-[#DC143C]">X</span>
    </span>
  );
}
