import React, { useState } from 'react';

const ASK_INBOX = 'contact.thepsychicstudio@gmail.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Email signup for the free daily card / horoscope email.
export const DailyCardSignup: React.FC<{ sign?: string }> = ({ sign }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || !email.includes('@')) return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ASK_INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Daily horoscope email signup${sign ? `: ${sign}` : ''}`,
          _template: 'table',
          _captcha: 'false',
          email,
          sign: sign || 'not chosen',
          source: 'daily-signup',
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="my-10 rounded-3xl border border-[#1f2322]/10 bg-[#f2f5e6] p-6 sm:p-8" aria-label="Daily horoscope email signup">
      <h2 className="text-2xl font-semibold tracking-tight mb-2 text-[#1f2322]">Get tomorrow's card by email</h2>
      <p className="text-[#1f2322]/70 mb-5">
        One short email each morning{sign ? ` with the daily card and reflection for ${sign}` : ' with the daily card and a reflection for your sign'}. Free, no account, unsubscribe any time by replying "stop".
      </p>
      {status === 'sent' ? (
        <p className="text-[#4a5f27] font-semibold" role="status">You are on the list. Watch for a confirmation email and tomorrow's card.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-wrap items-center gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-full border border-[#1f2322]/20 bg-white px-5 py-3 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a] w-64"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a] disabled:opacity-40"
          >
            {status === 'sending' ? 'Joining...' : 'Join free'}
          </button>
          {status === 'error' && <p className="text-sm text-red-700 w-full">Something went wrong. Please try again.</p>}
        </form>
      )}
    </section>
  );
};
