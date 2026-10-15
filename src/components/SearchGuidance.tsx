import React from 'react';
import { Link } from 'react-router-dom';

// Answer related query intent on existing pages, rather than making near-duplicate pages.
const GUIDES: Record<string, {heading: string; body: React.ReactNode}> = {
 '/horoscope/scorpio': {heading: 'Using your Scorpio horoscope today', body: <>
  <p>The daily card above is a reflection prompt, not a calculation of today's planetary transits. A Scorpio horoscope can offer a theme to consider; it cannot tell you what will happen or what another person intends.</p>
  <h3>A check-in for trust and boundaries</h3><p>Think of one situation where you want more certainty. Make two short lists: what has actually been said or done, and what you are filling in yourself. If a conversation is needed, choose one direct question rather than testing the other person or reading between every line.</p>
  <p>For work, apply the same check to a commitment: what has been agreed, and what still needs clarification? Write down one thing you can confirm today. Compare this with the <Link to="/tarot-card-meanings/the-moon">Moon's theme of uncertainty</Link>, or explore the <Link to="/zodiac/scorpio">Scorpio sign guide</Link> for the broader background.</p>
 </>},
 '/horoscope/libra': {heading: 'A practical way to read a Libra horoscope', body: <>
  <p>Use the daily card to think about a choice, rather than waiting for a forecast to choose for you. The changing card on this page is not a planetary-transit report.</p>
  <h3>Fairness is more than keeping everyone happy</h3><p>Choose one decision you have postponed. Name the options, whose needs each option meets and the cost of leaving the decision open. A fair outcome can still disappoint someone; that does not make it the wrong choice.</p>
  <p>In a relationship, turn "everything is fine" into a specific conversation about time, responsibilities or attention. At work, ask who owns the next step and when it is due. The <Link to="/tarot-card-meanings/justice">Justice card guide</Link> offers another way to consider fairness and responsibility. For a particular pairing, read <Link to="/zodiac-compatibility/taurus-and-libra">Taurus and Libra compatibility</Link>.</p>
 </>},
 '/zodiac/aries': {heading: 'What astrology sign is March 22?', body: <>
  <p>In the date convention used by this guide, March 22 falls within Aries: March 21 to April 19. Use the dates above as a quick sun-sign guide, not as a description of every part of a person.</p>
  <h3>From a sign description to a useful question</h3><p>Rather than assuming that an Aries label explains someone's behaviour, look at an example. When did taking initiative help? When would a pause or a second opinion have helped more? A description is useful only if it makes room for what you actually observe.</p>
  <p>If you want a reflective daily prompt, visit the <Link to="/horoscope/aries">Aries horoscope page</Link>. To understand why one sign is not a whole chart, start with the <Link to="/birth-chart">birth chart guide</Link>.</p>
 </>},
 '/zodiac-compatibility/taurus-and-libra': {heading: 'Taurus and Libra: questions for the relationship', body: <>
  <p>Compatibility is not a pass/fail result from two sun signs. Use the contrast between routine and options in this guide to start a conversation, then check it against your actual relationship. Either person can prefer stability in one part of life and variety in another.</p>
  <h3>Everyday decisions</h3><p>Suppose one person wants the same quiet Friday plan and the other wants to invite friends. Agree on the need before choosing the plan: rest, connection, novelty or time together. You might alternate plans or protect a quiet evening elsewhere in the week. This is an example to discuss, not a prediction about every Taurus-Libra couple.</p>
  <h3>Money, pace and disagreement</h3><p>Talk about a shared budget and what each person counts as worth spending on. For decisions, set a time to explore options and a time to commit. During disagreement, ask whether you are debating the choice itself or feeling unheard. A sign label should never excuse disrespect or pressure.</p>
  <p>Read the individual <Link to="/zodiac/taurus">Taurus</Link> and <Link to="/zodiac/libra">Libra</Link> guides, or use the <Link to="/love-tarot-reading">love tarot question guide</Link> to frame a question around your own choices.</p>
 </>},
 '/tarot-card-meanings/strength': {heading: 'Strength reversed: keywords in context', body: <>
  <p>For Strength reversed, try these reflection keywords: self-doubt, depleted patience, forced control and a need for gentleness. They are possible lenses, not a diagnosis or a prediction that you are weak.</p>
  <h3>When the card describes a challenge</h3><p>Imagine preparing for a difficult conversation while already exhausted. "Try harder" may not be the useful message. Ask whether rest, a clear limit or a calmer time would help you respond without either withdrawing or overpowering the other person.</p>
  <h3>When the card offers advice</h3><p>Separate firmness from force. Write one sentence that states what you need without an accusation, then decide what you will do if that need cannot be met. Read <Link to="/tarot-card-meanings/the-chariot">The Chariot</Link> alongside Strength to compare direction and determination with patient self-control.</p>
 </>},
 '/tarot-card-meanings/queen-of-wands': {heading: 'Queen of Wands reversed in a feelings question', body: <>
  <p>In a reflective reading, the reversed Queen of Wands can prompt questions about confidence, comparison or feeling less able to express yourself. It does not establish jealousy, attraction or any other private feeling in someone else.</p>
  <h3>Ask whose experience you are describing</h3><p>If the question is "How do they feel about me?", first record what you have observed and what you are guessing. Then change the question to something you can act on: "What would help me express interest clearly?" or "What boundary do I need while this remains uncertain?"</p>
  <h3>Love meaning without a fixed outcome</h3><p>Upright confidence and warmth do not guarantee a relationship, and a reversed card does not rule one out. In an advice position, consider whether you are shrinking yourself to be liked or performing confidence that you do not feel. Choose a small honest action rather than trying to control the response.</p>
  <p>Compare the <Link to="/tarot-card-meanings/queen-of-cups">Queen of Cups</Link> for a different focus on emotional attention, and the <Link to="/love-tarot-reading">love tarot question guide</Link> for questions that respect both people's choices.</p>
 </>},
};

export const SearchGuidance: React.FC<{path: string}> = ({path}) => {
 const guide=GUIDES[path];
 return guide ? <section className="st-search-guidance st-prose" aria-labelledby="search-guidance-heading"><h2 id="search-guidance-heading">{guide.heading}</h2>{guide.body}</section> : null;
};

export const SoulmateReadingGuide: React.FC = () => <section className="st-search-guidance st-prose" aria-labelledby="soulmate-guide-heading">
 <h2 id="soulmate-guide-heading">What can a soulmate reading help you explore?</h2>
 <p>People use "soulmate" to mean different things: a hoped-for partner, a strong connection or a relationship that feels meaningful. Start by naming what the word means to you. A reading can give you a way to reflect on that hope without claiming there is only one person you must find.</p>
 <h3>Useful questions before a reading</h3><ul><li>What does a safe, reciprocal connection look like in everyday life?</li><li>Which relationship pattern do I want to understand or change?</li><li>What am I hoping a reading will confirm, and what evidence would I need outside it?</li></ul>
 <h3>What a psychic soulmate reading cannot verify</h3><p>A reading cannot prove who your soulmate is, identify a stranger, promise a meeting date or establish another person's feelings. If you are waiting on someone, keep their actual words, actions and consent separate from the story you hope is true.</p>
 <h3>A practice example</h3><p>Instead of "Will my ex return because we are soulmates?", try "What am I holding onto, and what would help me decide whether to wait or move forward?" Write down a boundary and one action you can take whether or not contact happens. This is an example of framing a question, not a promised result of the service.</p>
 <p>Explore <Link to="/tarot-card-meanings/the-lovers">The Lovers</Link> for choices and values, or <Link to="/tarot-card-meanings/two-of-cups">Two of Cups</Link> for mutual connection. The <Link to="/love-tarot-reading">love tarot guide</Link> explains how to keep a question focused on your own decisions.</p>
 <p>Want to try a reflection before making an inquiry? The <Link to="/free-tarot">free tarot draw</Link> is available on this site. It is not a personalised soulmate consultation. Confirm what the personal reading includes with the studio before ordering.</p>
</section>;
