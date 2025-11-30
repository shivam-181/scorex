import React from 'react';

interface BrandNameProps {
  className?: string;
}

export default function BrandName({ className = '' }: BrandNameProps) {
  return (
    <span className={className}>
      <span className="text-apricot">SCORE</span>
      <span className="text-crimson">X</span>
    </span>
  );
}
