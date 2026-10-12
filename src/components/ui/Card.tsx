import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={[
        'bg-white/[0.04] border border-white/10',
        hover ? 'transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
