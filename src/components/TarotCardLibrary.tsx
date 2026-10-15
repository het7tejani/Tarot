import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CARD_PAGES } from '../data/seoPages';
import { FREE_TAROT_CARDS } from '../data/readingsData';
import { TarotArtwork } from './TarotArtwork';

const groups = ['Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles'];

export const TarotCardLibrary: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section className="st-card-library" aria-label="Browse tarot card meanings">
    <div className="st-card-tabs" role="tablist" aria-label="Card groups">
      {groups.map((group, index) => <button key={group} ref={el => { tabs.current[index] = el; }}
        id={`card-tab-${index}`} role="tab" type="button" aria-selected={selected === index}
        aria-controls={`card-panel-${index}`} tabIndex={selected === index ? 0 : -1}
        onClick={() => { setSelected(index); setQuery(''); }} onKeyDown={event => {
          const next = event.key === 'ArrowRight' ? (index + 1) % groups.length
            : event.key === 'ArrowLeft' ? (index + groups.length - 1) % groups.length
            : event.key === 'Home' ? 0 : event.key === 'End' ? groups.length - 1 : null;
          if (next !== null) { event.preventDefault(); setSelected(next); setQuery(''); tabs.current[next]?.focus(); }
        }}>{index === 0 ? group : `Suit of ${group}`}</button>)}
    </div>
    {groups.map((group, index) => {
      const cards = CARD_PAGES.filter(page => index === 0 ? page.card?.arcana === group : page.card?.suit === group);
      return <div key={group} id={`card-panel-${index}`} role="tabpanel" aria-labelledby={`card-tab-${index}`}
        hidden={selected !== index} tabIndex={0}>
        <h2 className="st-card-group-heading">{index === 0 ? group : `Suit of ${group}`} <span>({cards.length} cards)</span></h2>
        <label className="st-card-name-filter"><span className="sr-only">Filter cards by name</span><input type="search" placeholder="Filter cards by name..." value={query} onChange={event => setQuery(event.target.value)} /></label>
        <div className="st-card-gallery">{cards.map(page => <Link key={page.path} to={page.path} className="st-card-meaning-link" hidden={!page.card!.name.toLowerCase().includes(query.trim().toLowerCase())}>
          <TarotArtwork src={page.card!.img} alt={`${page.card!.name} tarot card`} loading="lazy"
            sizes="(max-width: 639px) 40vw, (max-width: 767px) 22vw, 160px" />
          <span className="st-card-number">{FREE_TAROT_CARDS.find(card => card.name === page.card!.name)?.number || page.card!.num}</span>
          <span>{page.card!.name}</span>
        </Link>)}</div>
        {!cards.some(page => page.card!.name.toLowerCase().includes(query.trim().toLowerCase())) && <p className="st-card-empty" role="status">No cards match this name.</p>}
      </div>;
    })}
  </section>;
};
