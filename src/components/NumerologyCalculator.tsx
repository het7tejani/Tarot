import React, { useState } from 'react';

const MEANINGS: Record<number, { title: string; text: string }> = {
  1: { title: 'The Leader', text: 'Independent, driven and original. Ones do their best work when they trust their own judgment and start before they feel ready. Watch for stubbornness: asking for help is a strength, not a weakness.' },
  2: { title: 'The Peacemaker', text: 'Sensitive, cooperative and tuned in to other people. Twos shine in partnerships and quiet support roles. The growth edge is saying what you need out loud instead of hoping others guess.' },
  3: { title: 'The Communicator', text: 'Expressive, creative and warm. Threes are here to make things: words, art, laughter, connection. Scattered energy is the classic trap, so finish one thing before starting the next.' },
  4: { title: 'The Builder', text: 'Practical, loyal and steady. Fours create things that last: systems, homes, businesses, trust. Remember that rest and play are part of the plan, not a break from it.' },
  5: { title: 'The Explorer', text: 'Curious, adaptable and hungry for freedom. Fives learn through experience and change. The work is finding variety without burning every bridge along the way.' },
  6: { title: 'The Nurturer', text: 'Caring, responsible and drawn to home and community. Sixes make people feel looked after. The lesson is caring for yourself with the same energy you give everyone else.' },
  7: { title: 'The Seeker', text: 'Thoughtful, analytical and private. Sevens need quiet time to think and are drawn to big questions. Let people in a little earlier than feels comfortable.' },
  8: { title: 'The Achiever', text: 'Ambitious, organized and good with power and money. Eights are built for big goals. Balance is the practice: success lands better when relationships come along for the ride.' },
  9: { title: 'The Humanitarian', text: 'Compassionate, idealistic and wise. Nines see the big picture and give generously. Letting go, of old roles and old hurts, is the lifelong theme.' },
  11: { title: 'The Intuitive (Master Number)', text: 'A master number: highly intuitive, sensitive and inspiring to others. Elevens pick up on what is unsaid. Grounding routines keep the sensitivity from turning into overwhelm.' },
  22: { title: 'The Master Builder (Master Number)', text: 'A master number: big vision plus the discipline to make it real. Twenty-twos can turn ambitious ideas into lasting structures. The risk is carrying too much alone, so delegate.' },
  33: { title: 'The Master Teacher (Master Number)', text: 'A master number: deep compassion expressed as teaching and healing. Thirty-threes lift others by example. Boundaries make the giving sustainable.' },
};

const reduce = (n: number): number => {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  }
  return n;
};

export const NumerologyCalculator: React.FC = () => {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return;
    const digits = (m[1] + m[2] + m[3]).split('').reduce((s, d) => s + Number(d), 0);
    setResult(reduce(digits));
  };

  const meaning = result !== null ? MEANINGS[result] : undefined;

  return (
    <section className="my-10 rounded-3xl border border-[#1f2322]/10 bg-[#f2f5e6] p-6 sm:p-8" aria-label="Life path number calculator">
      <h2 className="text-2xl font-semibold tracking-tight mb-2 text-[#1f2322]">Find your life path number</h2>
      <p className="text-[#1f2322]/70 mb-5">Enter your birth date. We add the digits together and reduce them to a single digit, keeping the master numbers 11, 22 and 33. Nothing is stored or sent anywhere; the calculation happens in your browser.</p>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setResult(null); }}
          className="rounded-full border border-[#1f2322]/20 bg-white px-5 py-3 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
          aria-label="Birth date"
        />
        <button
          type="button"
          onClick={calculate}
          disabled={!date}
          className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a] disabled:opacity-40 disabled:hover:bg-[#1f2322]"
        >
          Calculate
        </button>
      </div>
      {meaning && result !== null && (
        <div className="mt-6 rounded-2xl bg-white/70 p-6">
          <p className="text-xs uppercase tracking-[.2em] text-[#4a5f27] mb-1">Your life path number</p>
          <p className="text-5xl font-semibold text-[#4a5f27] mb-2">{result}</p>
          <p className="text-lg font-semibold text-[#1f2322] mb-2">{meaning.title}</p>
          <p className="text-[#1f2322]/80 leading-relaxed">{meaning.text}</p>
          <p className="text-xs text-[#1f2322]/50 mt-4">Numerology is a reflective tradition, not a science. Use it as a mirror, not a verdict.</p>
        </div>
      )}
    </section>
  );
};
