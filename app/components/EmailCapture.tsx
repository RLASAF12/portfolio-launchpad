'use client';

import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';

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
    <section style={{
      margin: '60px 0 40px', background: 'var(--color-card)',
      border: '1px solid var(--color-border)', borderRadius: 20,
      padding: 48, position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow effects */}
      <div style={{
        content: '', position: 'absolute', top: -60, right: -60, width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        content: '', position: 'absolute', bottom: -60, left: -60, width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(0,255,157,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)',
          letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12,
        }}>
          {'// join the list'}
        </div>

        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800,
          letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 10,
        }}>
          Building the <span style={{ color: 'var(--color-accent)' }}>AI Revolution</span>.
          <br />Want a front-row seat?
        </h2>

        <p style={{
          fontSize: 14, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)',
          marginBottom: 28, maxWidth: 480, lineHeight: 1.7,
        }}>
          Drop your email. Get early access to new prototypes, tools, and the occasional unhinged experiment.
        </p>

        {status === 'success' ? (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-accent)',
            background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.25)',
            borderRadius: 10, padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            ✓ You&apos;re in. I&apos;ll ping you when the next one ships.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 480 }}>
              <input
                type="email"
                placeholder="you@somewhere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'submitting'}
                style={{
                  flex: 1, background: 'var(--color-surface)',
                  border: `1px solid ${status === 'error' ? 'var(--color-accent3)' : 'var(--color-border)'}`,
                  borderRadius: 10, padding: '12px 16px',
                  color: 'var(--color-text)', fontFamily: 'var(--font-mono)',
                  fontSize: 13, outline: 'none', transition: 'border-color 0.2s',
                }}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  background: 'var(--color-accent)', border: 'none', borderRadius: 10,
                  padding: '12px 24px', color: '#000', fontFamily: 'var(--font-mono)',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.2s', letterSpacing: '0.05em',
                }}
              >
                {status === 'submitting' ? 'SAVING...' : 'JOIN →'}
              </button>
            </form>
            {status === 'error' && (
              <p style={{
                marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--color-accent3)',
              }}>
                {errorMessage}
              </p>
            )}
            <p style={{
              marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--color-muted)',
            }}>
              → Saved to Supabase. No spam. Just builds.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
