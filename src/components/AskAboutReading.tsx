import React, { useRef, useState } from 'react';
import { trackStudioEvent } from '../analytics';

// Destination inbox for reading inquiries. One-line swap if the studio inbox changes.
const ASK_INBOX = 'contact.thepsychicstudio@gmail.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const AskAboutReading: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [questions, setQuestions] = useState('');
  const [honey, setHoney] = useState('');
  const [started] = useState(() => Date.now());
  const [warned, setWarned] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const trackedStart = useRef(false);

  const analyticsParams = {
    form_id: 'ask_about_reading',
    page_path: window.location.pathname,
    reading_slug: slug,
    reading_title: title,
  };

  const markStarted = () => {
    if (trackedStart.current) return;
    trackedStart.current = true;
    trackStudioEvent('inquiry_form_start', analyticsParams);
  };

  const mailto = `mailto:${ASK_INBOX}?subject=${encodeURIComponent('Reading inquiry: ' + title)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Spam guard: honeypot filled means a bot. Fake success, send nothing.
    if (honey) { setStatus('sent'); return; }
    trackStudioEvent('inquiry_submit_attempt', analyticsParams);
    // Very fast completion is usually a script, but autofill users exist: warn once and always allow the retry.
    if (!warned && Date.now() - started < 2000) { setWarned(true); return; }
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ASK_INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Reading inquiry: ${title} (${name})`,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
          name,
          date_of_birth: dob,
          questions,
          reading: title,
          reading_url: `https://thepsychicstudio.com/readings/${slug}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      trackStudioEvent('inquiry_submit_success', analyticsParams);
      setStatus('sent');
    } catch {
      trackStudioEvent('inquiry_submit_error', { ...analyticsParams, error_type: 'send_failed' });
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="st-ask-done" role="status">
        <h3>Thank you, {name.split(' ')[0]}.</h3>
        <p>
          The studio has received your questions about <strong>{title}</strong> and will reply to you
          by email with the next step.
        </p>
      </div>
    );
  }

  return (
    <form
      className="st-ask-form"
      onSubmit={submit}
      onFocusCapture={markStarted}
      onInvalidCapture={(e) => trackStudioEvent('inquiry_form_validation_error', {
        ...analyticsParams,
        field_name: (e.target as HTMLInputElement | HTMLTextAreaElement).name || 'unknown',
      })}
    >
      <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
      <label>
        Your name
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => { markStarted(); setName(e.target.value); }}
        />
      </label>
      <label>
        Date of birth <span className="st-opt">(optional)</span>
        <input
          type="date"
          name="date_of_birth"
          autoComplete="bday"
          value={dob}
          onChange={(e) => { markStarted(); setDob(e.target.value); }}
        />
      </label>
      <label>
        Your questions
        <textarea
          name="questions"
          required
          placeholder="What would you like to ask about this reading?"
          value={questions}
          onChange={(e) => { markStarted(); setQuestions(e.target.value); }}
        />
      </label>
      <p className="st-ask-note">
        This goes straight to the studio inbox with the reading you asked about. The studio will email
        you back with the next step. Please do not send payment-card details or
        passwords here.
      </p>
      {warned && status === 'idle' && (
        <p className="st-ask-note" role="alert">
          That was very quick. Please review your answers and press send again.
        </p>
      )}
      {status === 'error' && (
        <p className="st-ask-note" role="alert">
          Something went wrong sending your questions. You can also <a href={mailto}>email the studio
          directly</a>.
        </p>
      )}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send your questions'}
      </button>
    </form>
  );
};
