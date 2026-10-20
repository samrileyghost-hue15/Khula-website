import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { serviceOptions, budgetOptions, timeframeOptions } from '../data/enquiry';
import type { EnquiryFormData } from '../types';

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  business: z.string().min(1, 'Please enter your business or organisation name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  serviceSlug: z.string().min(1, 'Please select a service'),
  budgetRange: z.string().min(1, 'Please select an indicative budget'),
  timeframe: z.string().min(1, 'Please select a timeframe'),
  description: z.string().min(30, 'Please provide at least 30 characters describing your project'),
  consent: z.boolean().refine((v) => v === true, 'You must agree to the privacy notice'),
});

type FormData = z.infer<typeof schema>;

// Steps: 0 = service, 1 = project context, 2 = budget + timeframe, 3 = contact, 4 = review
const TOTAL_STEPS = 4;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const preselectedService = searchParams.get('service') || '';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceSlug: preselectedService,
      fullName: '',
      business: '',
      email: '',
      phone: '',
      budgetRange: '',
      timeframe: '',
      description: '',
      consent: false,
    },
  });

  const values = watch();

  // Preselect service from URL param
  useEffect(() => {
    if (preselectedService) {
      setValue('serviceSlug', preselectedService);
    }
  }, [preselectedService, setValue]);

  const stepFields: Array<Array<keyof FormData>> = [
    ['serviceSlug'],
    ['description'],
    ['budgetRange', 'timeframe'],
    ['fullName', 'business', 'email', 'consent'],
  ];

  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.fullName.trim(),
          business: data.business.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone?.trim() || null,
          service_slug: data.serviceSlug,
          budget_range: data.budgetRange,
          timeframe: data.timeframe,
          description: data.description.trim(),
          consent: data.consent,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = (body as { error?: string }).error ?? `HTTP ${res.status}`;
        // 429 = rate limit; surface a friendlier message
        if (res.status === 429) {
          throw new Error('You have already submitted an enquiry recently. Please wait before trying again.');
        }
        throw new Error(msg);
      }

      setSubmitStatus('success');
    } catch (err) {
      console.error('[ContactPage] enquiry submission failed:', err);
      setSubmitStatus('error');
    }
  };

  const selectedService = serviceOptions.find((s) => s.value === values.serviceSlug);
  const selectedBudget = budgetOptions.find((b) => b.value === values.budgetRange);
  const selectedTimeframe = timeframeOptions.find((t) => t.value === values.timeframe);

  return (
    <>
      <SEOHead
        title="Start a Project"
        description="Tell KHULA about your project — we will review your brief and respond with the most appropriate approach."
        canonical="/contact"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-3xl">
          <SectionLabel className="mb-4 block">Get in touch</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Start a Project</h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            Tell KHULA about your project. We will review the brief and respond with the most
            appropriate approach, timeline and starting price.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-y">
        <div className="container-content max-w-3xl">
          {submitStatus === 'success' ? (
            <SuccessState name={values.fullName} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
              {/* Progress */}
              {step < TOTAL_STEPS && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-brand-grey">
                      Step {step + 1} of {TOTAL_STEPS}
                    </span>
                    <span className="text-xs text-brand-grey">
                      {Math.round(((step + 1) / TOTAL_STEPS) * 100)}% complete
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-green transition-all duration-300 rounded-full"
                      style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={step + 1}
                      aria-valuemin={1}
                      aria-valuemax={TOTAL_STEPS}
                    />
                  </div>
                </div>
              )}

              {/* Step 0: Service selection */}
              {step === 0 && (
                <StepSection
                  title="What service are you interested in?"
                  description="Select the service that best describes what you need. You can discuss the details in the next step."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-labelledby="service-label">
                    <span id="service-label" className="sr-only">Select a service</span>
                    {serviceOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 border cursor-pointer transition-all duration-150 ${values.serviceSlug === option.value
                          ? 'border-brand-green bg-brand-green/[0.05] text-brand-white'
                          : 'border-white/10 hover:border-white/25 text-white/70 hover:text-white/90'
                          }`}
                      >
                        <input
                          type="radio"
                          {...register('serviceSlug')}
                          value={option.value}
                          className="sr-only"
                          aria-label={option.label}
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${values.serviceSlug === option.value
                            ? 'border-brand-green bg-brand-green'
                            : 'border-white/30'
                            }`}
                          aria-hidden="true"
                        />
                        <div>
                          <div className="text-sm font-medium leading-snug">{option.label}</div>
                          <div className="text-xs text-brand-grey">{option.category}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.serviceSlug && (
                    <FieldError message={errors.serviceSlug.message} />
                  )}
                </StepSection>
              )}

              {/* Step 1: Project context */}
              {step === 1 && (
                <StepSection
                  title="Tell us about your project"
                  description="Describe the business, the audience and the challenge you are trying to solve. More context helps produce a more useful response."
                >
                  <div>
                    <label htmlFor="description" className="label-text block mb-2">
                      Project description <span className="text-brand-green">*</span>
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      rows={8}
                      placeholder="Describe your business, the audience, the problem and what you are trying to achieve..."
                      className="w-full bg-white/[0.04] border border-white/15 text-brand-white placeholder:text-brand-grey/50 text-sm p-4 focus:outline-none focus:border-brand-green/60 transition-colors resize-none"
                      aria-describedby={errors.description ? 'desc-error' : undefined}
                    />
                    {errors.description && (
                      <FieldError id="desc-error" message={errors.description.message} />
                    )}
                    <p className="text-xs text-brand-grey mt-2">
                      You will have a chance to review everything before submitting.
                    </p>
                  </div>
                </StepSection>
              )}

              {/* Step 2: Budget + timeframe */}
              {step === 2 && (
                <StepSection
                  title="Budget and timeframe"
                  description="Indicative ranges help scope the project appropriately. Select 'Not sure yet' if you are unsure — it will not exclude you."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Budget */}
                    <div>
                      <label className="label-text block mb-3">
                        Indicative budget <span className="text-brand-green">*</span>
                      </label>
                      <div className="space-y-2" role="radiogroup" aria-labelledby="budget-label">
                        <span id="budget-label" className="sr-only">Select a budget range</span>
                        {budgetOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${values.budgetRange === option.value
                              ? 'border-brand-green bg-brand-green/[0.05]'
                              : 'border-white/10 hover:border-white/20'
                              }`}
                          >
                            <input
                              type="radio"
                              {...register('budgetRange')}
                              value={option.value}
                              className="sr-only"
                              aria-label={option.label}
                            />
                            <span
                              className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${values.budgetRange === option.value
                                ? 'border-brand-green bg-brand-green'
                                : 'border-white/30'
                                }`}
                              aria-hidden="true"
                            />
                            <span className="text-sm text-white/80">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.budgetRange && <FieldError message={errors.budgetRange.message} />}
                    </div>

                    {/* Timeframe */}
                    <div>
                      <label className="label-text block mb-3">
                        Desired timeframe <span className="text-brand-green">*</span>
                      </label>
                      <div className="space-y-2" role="radiogroup" aria-labelledby="timeframe-label">
                        <span id="timeframe-label" className="sr-only">Select a timeframe</span>
                        {timeframeOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${values.timeframe === option.value
                              ? 'border-brand-green bg-brand-green/[0.05]'
                              : 'border-white/10 hover:border-white/20'
                              }`}
                          >
                            <input
                              type="radio"
                              {...register('timeframe')}
                              value={option.value}
                              className="sr-only"
                              aria-label={option.label}
                            />
                            <span
                              className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${values.timeframe === option.value
                                ? 'border-brand-green bg-brand-green'
                                : 'border-white/30'
                                }`}
                              aria-hidden="true"
                            />
                            <span className="text-sm text-white/80">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.timeframe && <FieldError message={errors.timeframe.message} />}
                    </div>
                  </div>
                </StepSection>
              )}

              {/* Step 3: Contact details */}
              {step === 3 && (
                <StepSection
                  title="Your contact details"
                  description="KHULA will review your brief and respond to the email address provided."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      id="fullName"
                      label="Full name"
                      required
                      error={errors.fullName?.message}
                    >
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        {...register('fullName')}
                        className="form-input"
                        placeholder="Your full name"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'name-error' : undefined}
                      />
                    </FormField>

                    <FormField
                      id="business"
                      label="Business or organisation"
                      required
                      error={errors.business?.message}
                    >
                      <input
                        id="business"
                        type="text"
                        autoComplete="organization"
                        {...register('business')}
                        className="form-input"
                        placeholder="Business name"
                        aria-invalid={!!errors.business}
                      />
                    </FormField>

                    <FormField
                      id="email"
                      label="Email address"
                      required
                      error={errors.email?.message}
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className="form-input"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                    </FormField>

                    <FormField id="phone" label="Contact number" hint="Optional">
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        {...register('phone')}
                        className="form-input"
                        placeholder="Optional"
                      />
                    </FormField>
                  </div>

                  {/* Consent */}
                  <div className="mt-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('consent')}
                        className="sr-only"
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                      />
                      <span
                        className={`w-5 h-5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${values.consent
                          ? 'border-brand-green bg-brand-green'
                          : 'border-white/30 group-hover:border-white/50'
                          }`}
                        aria-hidden="true"
                      >
                        {values.consent && <Check size={12} className="text-brand-black" />}
                      </span>
                      <span className="text-sm text-white/60 leading-relaxed">
                        I agree to my information being used to process this enquiry and I have read
                        the{' '}
                        <Link to="/privacy" className="text-brand-green hover:underline" target="_blank">
                          Privacy Policy
                        </Link>
                        . <span className="text-brand-green">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <FieldError id="consent-error" message={errors.consent.message} />
                    )}
                  </div>
                </StepSection>
              )}

              {/* Step 4: Review */}
              {step === TOTAL_STEPS && (
                <StepSection
                  title="Review your enquiry"
                  description="Check everything looks correct before submitting."
                >
                  <div className="space-y-4 mb-8">
                    <ReviewRow label="Service" value={selectedService?.label || values.serviceSlug} />
                    <ReviewRow label="Project description" value={values.description} multiline />
                    <ReviewRow label="Indicative budget" value={selectedBudget?.label || values.budgetRange} />
                    <ReviewRow label="Timeframe" value={selectedTimeframe?.label || values.timeframe} />
                    <ReviewRow label="Name" value={values.fullName} />
                    <ReviewRow label="Business" value={values.business} />
                    <ReviewRow label="Email" value={values.email} />
                    {values.phone && <ReviewRow label="Phone" value={values.phone} />}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 mb-6">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">
                        Something went wrong. Your information has been preserved — please try again
                        or contact us directly.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={submitStatus === 'loading'}
                    disabled={submitStatus === 'loading'}
                  >
                    {submitStatus === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
                    {submitStatus !== 'loading' && <ArrowRight size={15} />}
                  </Button>
                </StepSection>
              )}

              {/* Navigation */}
              {step < TOTAL_STEPS && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                  {step > 0 ? (
                    <Button type="button" variant="ghost" size="md" onClick={handleBack}>
                      <ArrowLeft size={14} />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button type="button" variant="primary" size="md" onClick={handleNext}>
                    Continue
                    <ArrowRight size={14} />
                  </Button>
                </div>
              )}

              {step === TOTAL_STEPS && (
                <div className="mt-6">
                  <Button type="button" variant="ghost" size="sm" onClick={handleBack}>
                    <ArrowLeft size={14} />
                    Edit
                  </Button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StepSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-heading text-display-sm text-brand-white mb-2">{title}</h2>
      <p className="text-white/50 text-sm mb-8">{description}</p>
      {children}
    </div>
  );
}

function FormField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-text block mb-2">
        {label}
        {required && <span className="text-brand-green ml-1">*</span>}
        {hint && <span className="ml-2 text-brand-grey/60 normal-case tracking-normal">{hint}</span>}
      </label>
      {children}
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5" role="alert">
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

function ReviewRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="border-b border-white/10 pb-4 grid grid-cols-3 gap-4">
      <div className="text-xs text-brand-grey pt-0.5">{label}</div>
      <div className={`col-span-2 text-sm text-white/80 ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function SuccessState({ name }: { name: string }) {
  return (
    <div className="text-center max-w-lg mx-auto py-16">
      <div className="w-16 h-16 bg-brand-green/15 border border-brand-green/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={28} className="text-brand-green" />
      </div>
      <h2 className="font-heading text-display-sm text-brand-white mb-3">
        Enquiry received, {name.split(' ')[0]}.
      </h2>
      <p className="text-white/50 leading-relaxed mb-8">
        KHULA will review your project brief and respond to the email address you provided. In the
        meantime, feel free to explore the work and services.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button as="link" to="/work" variant="primary" size="md">
          Explore Our Work
        </Button>
        <Button as="link" to="/" variant="ghost" size="md">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
