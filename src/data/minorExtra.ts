// Extra card-specific copy for the 56 minor arcana cards: two paragraphs built from the rank's theme and the suit's area of life.
// Reflection prompts, not predictions.
type Rank = { theme: string; step: string; ask: string; shadow: string };
type Suit = { area: string; element: string; tool: string; daily: string; sign: string };
const RANKS: Record<string, Rank> = {
  ace: { theme: 'a clean beginning and a seed of potential', step: 'Name the one small thing you can start this week and give it a date.', ask: 'What is trying to begin, and what would it need from you to take root?', shadow: 'an offer you have not accepted, or a start you keep postponing' },
  two: { theme: 'a choice, a balance or a partnership between two things', step: 'Write both options side by side and list what each one costs and gives.', ask: 'Which option would you pick if nobody else had an opinion?', shadow: 'indecision that has started to cost more than either choice' },
  three: { theme: 'early growth, teamwork and the first visible results', step: 'Share your plan or draft with one person whose view you trust.', ask: 'Who is part of this with you, and what do they need to hear?', shadow: 'effort that is not yet being shared or noticed' },
  four: { theme: 'stability, rest and holding what you have built', step: 'Decide what deserves protection and what you can stop guarding.', ask: 'Is this a healthy pause or a way of avoiding the next step?', shadow: 'a pause that has turned into being stuck' },
  five: { theme: 'conflict, strain and a test of what you value', step: 'Separate the real issue from the noise and choose which battles are worth your energy.', ask: 'What is actually at stake, and who benefits if this continues?', shadow: 'tension you have been carrying alone' },
  six: { theme: 'relief, exchange and movement toward calmer ground', step: 'Acknowledge what has helped you and return the favour where you can.', ask: 'What is getting easier, and what support are you giving or receiving?', shadow: 'help that comes with strings, or a move that is not yet complete' },
  seven: { theme: 'a test of commitment, strategy and patience', step: 'Look at what you are defending or chasing and pick one priority.', ask: 'Are you protecting what matters, or just staying busy?', shadow: 'scattered effort and doubt about your own plan' },
  eight: { theme: 'focused work, skill-building and deliberate change', step: 'Block time for the work that moves this forward and ignore the rest for now.', ask: 'What are you getting better at, and what are you leaving behind?', shadow: 'repetition without direction' },
  nine: { theme: 'near-completion, resilience and what experience has taught you', step: 'Take stock of what you have already handled and rest before the last stretch.', ask: 'What have you learned that you can rely on now?', shadow: 'exhaustion or worry that is louder than the facts' },
  ten: { theme: 'an ending, a full load and the close of a cycle', step: 'Decide what to finish, what to hand off and what to put down.', ask: 'What have you outgrown, and what are you ready to carry forward?', shadow: 'a burden you have not asked anyone to share' },
  page: { theme: 'curiosity, a message and the willingness to learn', step: 'Ask one honest question, read or try something new, and keep notes.', ask: 'What are you curious about that you have been treating as unimportant?', shadow: 'immaturity, hesitation or news you are not ready to hear' },
  knight: { theme: 'pursuit, momentum and acting on an aim', step: 'Set a direction and a pace you can keep up, not only a burst of speed.', ask: 'Where are you moving fast, and is it toward what you want?', shadow: 'rushing, or a plan that stops halfway' },
  queen: { theme: 'mature, inward mastery and care', step: 'Use your own judgment and set one boundary that protects your focus.', ask: 'How can you lead by example in this area without taking on everything?', shadow: 'over-giving, guardedness or control' },
  king: { theme: 'authority, responsibility and a long view', step: 'Make the decision you have been delaying and be clear about the reason.', ask: 'What would steady leadership look like here, for you and for others?', shadow: 'rigidity, pride or using position to avoid listening' },
};
const SUITS: Record<string, Suit> = {
  wands: { area: 'drive, creativity and ambition', element: 'fire', tool: 'the wand', daily: 'projects, ideas and the energy you put into them', sign: 'Aries, Leo and Sagittarius' },
  cups: { area: 'feelings, relationships and intuition', element: 'water', tool: 'the cup', daily: 'friendships, family, love and how you respond emotionally', sign: 'Cancer, Scorpio and Pisces' },
  swords: { area: 'thought, truth and communication', element: 'air', tool: 'the sword', daily: 'decisions, conversations and the stories you tell yourself', sign: 'Gemini, Libra and Aquarius' },
  pentacles: { area: 'work, money and the practical world', element: 'earth', tool: 'the coin', daily: 'income, health routines, home and long-term results', sign: 'Taurus, Virgo and Capricorn' },
};
export const minorExtra = (slug: string, name: string): [string, string, string] | undefined => {
  const m = slug.match(/^(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)-of-(wands|cups|swords|pentacles)$/);
  if (!m) return undefined;
  const r = RANKS[m[1]], s = SUITS[m[2]];
  return [
    `${name} combines ${r.theme} with the suit of ${m[2]}, which is about ${s.area}. In everyday terms the card touches ${s.daily}. Because ${m[2]} belong to ${s.element}, readers often link the card with ${s.sign}, though the card speaks to anyone and does not depend on your birth sign.`,
    `How to use it: ${r.step} Then ask yourself, ${r.ask[0].toLowerCase()}${r.ask.slice(1)} If the card feels uncomfortable, look at whether it points to ${r.shadow}. Treat the answer as a prompt for reflection, not a prediction, and compare it with the other cards in your spread.`,
    `Journal prompt for ${name}: where in ${s.daily} do you see ${r.theme.split(',')[0]} showing up right now, and which single action would move it forward?`,
  ];
};
