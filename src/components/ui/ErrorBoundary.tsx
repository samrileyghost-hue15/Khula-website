import { Component, type ReactNode } from 'react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches runtime errors in child component trees and renders a recovery UI.
 * Wrap around any route that depends on async data so a single fetch failure
 * never takes down the whole app.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Log to console in dev; swap for a real error-reporting service in prod
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        className="section-y container-content flex flex-col items-center justify-center text-center gap-6 min-h-[50vh]"
      >
        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-xl font-heading font-600">!</span>
        </div>
        <div>
          <h2 className="font-heading text-display-sm text-brand-white mb-2">
            Something went wrong
          </h2>
          <p className="text-brand-grey text-sm max-w-sm">
            This section failed to load. You can try again or return to the home page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 text-left text-xs text-red-400/70 bg-red-500/5 border border-red-500/20 p-4 rounded max-w-lg overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="primary" size="sm" onClick={this.reset}>
            Try again
          </Button>
          <Button as="link" to="/" variant="ghost" size="sm">
            Back to home
          </Button>
        </div>
      </div>
    );
  }
}
