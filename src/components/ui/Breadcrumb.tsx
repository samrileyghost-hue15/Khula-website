import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-grey">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-white/30" />}
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-brand-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-brand-white/80' : ''}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
