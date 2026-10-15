import React from 'react';
import {Link} from 'react-router-dom';

export const TarotStudyGuide: React.FC = () => <section className="st-tarot-study" aria-labelledby="study-guide-heading">
 <h2 id="study-guide-heading">How to turn a card meaning into a useful reading</h2>
 <p>A keyword is a starting point, not the whole answer. Keep your question and the card's position together: the same card can describe a resource in one position and a habit to question in another.</p>
 <h3>A worked three-card example</h3>
 <p>Suppose your question is "How can I approach a new creative project?" This is an invented practice spread, not a reading drawn for you.</p>
 <div className="st-study-example">
  <article><span>1 · Situation</span><h4><Link to="/tarot-card-meanings/the-fool">The Fool</Link></h4><p>You are at the beginning. There is room to experiment, but enthusiasm does not tell you what the project will cost.</p><p><strong>Ask:</strong> What could I try once before making a larger commitment?</p></article>
  <article><span>2 · What to examine</span><h4><Link to="/tarot-card-meanings/seven-of-cups">Seven of Cups</Link></h4><p>Several ideas compete for attention. Explore the difference between an appealing possibility and a plan you can actually test.</p><p><strong>Ask:</strong> Which option has enough detail for a first attempt?</p></article>
  <article><span>3 · A possible next step</span><h4><Link to="/tarot-card-meanings/eight-of-pentacles">Eight of Pentacles</Link></h4><p>Shift from imagining the finished result to practising one part of the work. The card does not promise success; it gives the reflection a practical focus.</p><p><strong>Ask:</strong> What skill can I practise, and how will I check my progress?</p></article>
 </div>
 <p>Read together, the cards suggest testing one idea and learning through practice. Move Eight of Pentacles to the challenge position and the question changes: are you repeating familiar work instead of testing something new? The position changes the interpretation.</p>
 <h3>Choose the guide that matches your question</h3>
 <ul><li>For connection and communication, start with the <Link to="/love-tarot-reading">love tarot question guide</Link>, then compare <Link to="/tarot-card-meanings/the-lovers">The Lovers</Link> with <Link to="/tarot-card-meanings/two-of-cups">Two of Cups</Link>.</li>
 <li>For a decision, compare <Link to="/tarot-card-meanings/justice">Justice</Link> and <Link to="/tarot-card-meanings/two-of-swords">Two of Swords</Link>: fairness and evidence are different questions from hesitation.</li>
 <li>To try the method, use the <Link to="/free-tarot">free tarot draw</Link>. Write down your question before drawing and a practical observation afterward.</li></ul>
 <h3>Do I need to read reversed cards?</h3>
 <p>No. You can choose an upright-only practice. If you use reversals, decide on that approach before drawing, then consider whether a theme is blocked, excessive or directed inward. Do not keep changing the method until the answer feels reassuring.</p>
 <h3>Can a card confirm what someone else thinks?</h3>
 <p>No card can verify private thoughts. Keep a relationship reading focused on your choices, boundaries and the information you can obtain through a respectful conversation.</p>
</section>;
