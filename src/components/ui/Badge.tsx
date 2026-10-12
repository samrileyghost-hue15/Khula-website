interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide rounded-sm';
  const variants = {
    default: 'bg-white/10 text-white/70',
    green: 'bg-brand-green/15 text-brand-green',
    outline: 'border border-white/20 text-white/60',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
