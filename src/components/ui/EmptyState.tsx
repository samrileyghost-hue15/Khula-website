import { Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your filters or search terms.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Search size={20} className="text-brand-grey" />
      </div>
      <h3 className="font-heading text-lg text-brand-white mb-2">{title}</h3>
      <p className="text-brand-grey text-sm max-w-xs">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
