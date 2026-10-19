import React, { useState } from 'react';

// Destination inbox for reading inquiries. One-line swap if the studio inbox changes.
const ASK_INBOX = 'contact.thepsychicstudio@gmail.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const AskAboutReading: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [questions, setQuestions] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const mailto = `mailto:${ASK_INBOX}?subject=${encodeURIComponent('Reading inquiry: ' + title)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ASK_INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Reading inquiry: ${title} (${name})`,
          _template: 'table',
          _captcha: 'false',
          name,
          date_of_birth: dob,
          questions,
          reading: title,
          reading_url: `https://thepsychicstudio.com/readings/${slug}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="st-ask-done" role="status">
        <h3>Thank you, {name.split(' ')[0]}.</h3>
        <p>
          The studio has received your questions about <strong>{title}</strong> and will reply to you
          by email with the next step and payment details.
        </p>
      </div>
    );
  }

  return (
    <form className="st-ask-form" onSubmit={submit}>
      <label>
        Your name
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Date of birth
        <input
          type="date"
          name="date_of_birth"
          autoComplete="bday"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </label>
      <label>
        Your questions
        <textarea
          name="questions"
          required
          placeholder="What would you like to ask about this reading?"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
      </label>
      <p className="st-ask-note">
        This goes straight to the studio inbox with the reading you asked about. The studio will email
        you back with the next step and payment details. Please do not send payment-card details or
        passwords here.
      </p>
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
