import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never; to?: never };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string; to?: never };

type ButtonAsLink = BaseProps & LinkProps & { as: 'link'; href?: never };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-green text-brand-black font-semibold hover:bg-[#34a365] active:bg-[#2d8f57] focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
  secondary:
    'bg-brand-white text-brand-black font-semibold hover:bg-brand-light active:bg-brand-light focus-visible:ring-2 focus-visible:ring-brand-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
  ghost:
    'bg-transparent text-brand-white font-medium border border-white/20 hover:border-white/50 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
  outline:
    'bg-transparent text-brand-green font-medium border border-brand-green/50 hover:border-brand-green hover:bg-brand-green/5 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded',
  md: 'px-6 py-3 text-sm rounded',
  lg: 'px-8 py-4 text-base rounded',
};

function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  loading: boolean,
  className?: string
) {
  return [
    'inline-flex items-center justify-center gap-2 transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    loading ? 'cursor-wait' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    className,
    children,
  } = props;

  const cls = buildClassName(variant, size, fullWidth, loading, className);

  if ((props as ButtonAsLink).as === 'link') {
    const { as: _as, variant: _v, size: _s, loading: _l, fullWidth: _fw, ...linkRest } =
      props as ButtonAsLink;
    return (
      <Link {...linkRest} className={cls}>
        {loading ? <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> : null}
        {children}
      </Link>
    );
  }

  if ((props as ButtonAsAnchor).as === 'a') {
    const { as: _as, variant: _v, size: _s, loading: _l, fullWidth: _fw, ...anchorRest } =
      props as ButtonAsAnchor;
    return (
      <a {...anchorRest} className={cls}>
        {loading ? <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> : null}
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, loading: _l, fullWidth: _fw, className: _cls, children: _ch, ...btnRest } =
    props as ButtonAsButton;

  return (
    <button ref={ref} {...btnRest} disabled={loading || btnRest.disabled} className={cls}>
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
