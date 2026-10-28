import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_INFO } from '../data/seoPages';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = [31,29,31,30,31,30,31,31,30,31,30,31];
// [month index, first day] for each sign start, in calendar order from Capricorn
const STARTS: [number, number, string][] = [
  [0, 1, 'capricorn'], [0, 20, 'aquarius'], [1, 19, 'pisces'], [2, 21, 'aries'], [3, 20, 'taurus'], [4, 21, 'gemini'],
  [5, 21, 'cancer'], [6, 23, 'leo'], [7, 23, 'virgo'], [8, 23, 'libra'], [9, 23, 'scorpio'], [10, 22, 'sagittarius'], [11, 22, 'capricorn'],
];

function signFor(m: number, d: number): string {
  let found = 'capricorn';
  for (const [sm, sd, n] of STARTS) if (m > sm || (m === sm && d >= sd)) found = n;
  return found;
}

export function ZodiacSignFinder() {
  const [month, setMonth] = useState(-1);
  const [day, setDay] = useState(0);
  const ready = month >= 0 && day > 0;
  const sign = ready ? SIGN_INFO.find((s) => s.n === signFor(month, day)) : undefined;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const sel = 'rounded-lg border border-[#1f2322]/20 bg-white/60 px-3 py-2 text-sm';
  return (
    <section id="sign-finder" aria-label="Zodiac sign finder" className="my-8">
      <h2>Find your zodiac sign by birth date</h2>
      <p>Pick your birth month and day to see your sun sign and its date range.</p>
      <div className="flex flex-wrap gap-3 my-4">
        <label className="text-sm">Month <select className={sel} value={month} onChange={(e) => { setMonth(Number(e.target.value)); setDay(0); }}>
          <option value={-1}>Select</option>{MONTHS.map((n, i) => <option key={n} value={i}>{n}</option>)}</select></label>
        <label className="text-sm">Day <select className={sel} value={day} onChange={(e) => setDay(Number(e.target.value))} disabled={month < 0}>
          <option value={0}>Select</option>{Array.from({ length: month >= 0 ? DAYS[month] : 0 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>
      </div>
      {sign && (
        <div role="status" aria-live="polite">
          <p><strong>{MONTHS[month]} {day} is {cap(sign.n)}.</strong> The {cap(sign.n)} date range is {sign.dates}.</p>
          <p>
            <Link to={`/zodiac/${sign.n}`} className="underline underline-offset-4 font-semibold">{cap(sign.n)} traits and dates</Link>
            {' · '}
            <Link to={`/horoscope/${sign.n}`} className="underline underline-offset-4 font-semibold">{cap(sign.n)} tarot reflection</Link>
          </p>
          <p>If you were born within a day of a sign boundary, the exact change time differs by year, so check your birth time and place with a chart calculation.</p>
        </div>
      )}
    </section>
  );
}
