'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const { error } = await supabase
      .from('emails')
      .insert({ email: trimmed, source: 'portfolio' });

    if (error) {
      setStatus('error');
      if (error.code === '23505') {
        setErrorMessage("You're already on the list!");
      } else {
        setErrorMessage('Something went wrong. Try again.');
      }
      return;
    }

    setStatus('success');
    setEmail('');
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-raised p-8 sm:p-12">
      {/* Subtle gradient glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/[0.04] blur-[80px]" />

      <div className="relative mx-auto max-w-md text-center">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Get notified when I ship something new
        </h2>
        <p className="mt-2 text-sm text-white/40">
          No spam. Just a ping when a new prototype goes live.
        </p>

        {status === 'success' ? (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-sm text-green-400">
            <Check className="h-4 w-4" />
            You're in. I'll ping you when the next one ships.
          </div>
        ) : (
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                className={cn(
                  'h-11 flex-1 rounded-xl border bg-white/[0.03] px-4 text-sm text-white placeholder-white/25 outline-none transition-colors',
                  status === 'error'
                    ? 'border-red-500/30 focus:border-red-500/50'
                    : 'border-white/[0.08] focus:border-white/[0.2]'
                )}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'submitting'}
              />
              <button
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition-all hover:bg-white/90 disabled:opacity-40"
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  'Saving…'
                ) : (
                  <>
                    Notify me
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-2 text-left text-xs text-red-400/80" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
