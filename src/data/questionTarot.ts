import { TarotCard } from '../types';

type Topic = 'career' | 'love' | 'money' | 'study' | 'family' | 'wellbeing' | 'decision' | 'general';
const topics: [Topic, RegExp][] = [
  ['wellbeing', /\b(health|illness|sick|medical|doctor|pregnan\w*|depress\w*|anxiety|suicid\w*|self.harm|pain)\b/i],
  ['career', /\b(job\w*|work\w*|career|employ\w*|interview\w*|resume|cv|promotion|boss|business|unemploy\w*)\b/i],
  ['love', /\b(love|relationship\w*|partner|boyfriend|girlfriend|husband|wife|marriage|marry|dating|breakup|ex)\b/i],
  ['money', /\b(money|financ\w*|debt|income|invest\w*|saving\w*|rent|afford|budget|loan)\b/i],
  ['study', /\b(study|studies|student|school|college|university|exam\w*|learn\w*|education|course)\b/i],
  ['family', /\b(family|parent\w*|mother|father|child\w*|sibling|friend\w*|sister|brother)\b/i],
  ['decision', /\b(decid\w*|decision\w*|choose|choice\w*|move|moving|change|should|which)\b/i],
];
const frames: Record<Topic, { label: string; context: string; action: string }> = {
  career: { label: 'Work and job search', context: 'your job search or working life', action: 'Pick one role that fits your skills and tailor an application to its requirements. If applications are not leading to interviews, ask someone to review your CV; if interviews are not leading to offers, practise one specific answer.' },
  love: { label: 'Love and relationships', context: 'your relationship question', action: 'Name what you need and what you have actually observed. Choose one respectful conversation or boundary; this draw cannot reveal another person\'s feelings.' },
  money: { label: 'Money and everyday stability', context: 'your concern about money', action: 'Separate what you know from what you fear. This is reflection, not financial advice or an investment signal; use reliable figures and qualified advice for money decisions.' },
  study: { label: 'Study and learning', context: 'your study or learning question', action: 'Choose one topic to practise, check what is confusing you, and ask a teacher or study partner for specific feedback rather than trying to solve everything at once.' },
  family: { label: 'Family and friendships', context: 'your family or friendship question', action: 'Separate your needs from the other person\'s choices. Write down one thing you can say calmly and one limit you want to respect.' },
  wellbeing: { label: 'Wellbeing and support', context: 'the feelings around your wellbeing question', action: 'Tarot cannot assess symptoms, diagnose a condition or guide treatment. Take health concerns to a qualified professional. If you may hurt yourself or are in immediate danger, contact local emergency help or a trusted person now.' },
  decision: { label: 'Choices and change', context: 'the choice you are considering', action: 'Write down the options, one fact you still need, and a small reversible step. Do not use a draw to settle a legal, medical or financial decision.' },
  general: { label: 'Personal reflection', context: 'the situation in your question', action: 'Name the part of this situation you can influence, one fact you still need, and one small step that does not depend on a prediction.' },
};
// Card-specific lenses. They guide reflection rather than predicting a result.
const lenses: Record<string, [string, string, string]> = {
  'The Fool': ['a small fresh start', 'starting without checking the practical details', 'Try a low-risk first step instead of waiting to feel fully ready.'],
  'The Magician': ['using the skills and resources you already have', 'doubting your skills or spreading your effort too thin', 'Make your abilities visible through one concrete example.'],
  'The High Priestess': ['noticing what you have not yet said or understood', 'treating a feeling as proof', 'Pause, then check your impression against facts.'],
  'The Empress': ['growth through steady care', 'giving more energy than you can sustain', 'Create a routine that supports your effort without exhausting you.'],
  'The Emperor': ['structure and clear boundaries', 'rigid plans or a lack of structure', 'Set a realistic plan with one clear priority.'],
  'The Hierophant': ['learning from a useful guide or established method', 'following a rule that may not fit your situation', 'Seek feedback from someone with relevant experience, then judge what fits.'],
  'The Lovers': ['alignment between your choices and your values', 'conflicting priorities', 'Name what matters most before choosing your next step.'],
  'The Chariot': ['focused effort in one direction', 'pushing harder without a clear direction', 'Choose a target and track one action you can control.'],
  'Strength': ['patient confidence under pressure', 'self-criticism or forcing progress', 'Practise one difficult step gently and consistently.'],
  'The Hermit': ['taking time to review your approach', 'withdrawing when outside feedback could help', 'Review what you have tried, then ask one trusted person for perspective.'],
  'Wheel of Fortune': ['adapting when circumstances change', 'feeling powerless about timing', 'Separate external circumstances from the actions still available to you.'],
  'Justice': ['checking facts and treating yourself fairly', 'drawing conclusions without enough evidence', 'Review the evidence and your responsibilities without blaming yourself.'],
  'The Hanged Man': ['seeing a stalled situation from another angle', 'waiting without reconsidering your approach', 'Try a different method or ask what assumption needs checking.'],
  'Death': ['letting go of an approach that no longer helps', 'holding onto a familiar but unhelpful pattern', 'Choose one habit to stop and one practical replacement. This card is not a prediction of death.'],
  'Temperance': ['finding a sustainable pace', 'an approach that is out of balance', 'Combine steady effort with enough time to recover and review.'],
  'The Devil': ['recognising a limiting pattern', 'overlooking where you still have a choice', 'Name one habit, fear or pressure that narrows your options.'],
  'The Tower': ['rebuilding after a disruption', 'avoiding a problem that needs attention', 'Stabilise what you can before planning the next step; this does not predict a disaster.'],
  'The Star': ['rebuilding hope through small steps', 'discouragement obscuring useful possibilities', 'Choose a manageable action that makes progress visible.'],
  'The Moon': ['uncertainty and incomplete information', 'confusing anxiety with evidence', 'Find one missing fact before committing to a conclusion.'],
  'The Sun': ['clarity and visible strengths', 'overlooking progress or expecting instant success', 'Notice what is working and make one strength easier to see.'],
  'Judgement': ['reviewing experience and choosing a new direction', 'judging yourself instead of learning', 'Use past feedback to change one part of your approach.'],
  'The World': ['recognising completion and preparing the next stage', 'an unfinished step blocking your progress', 'Identify what is complete and the one remaining step you can finish.'],
};
export function questionReading(card: TarotCard, question: string, reversed: boolean, position: 'single' | 'past' | 'present' | 'future') {
  const topic = topics.find(([, pattern]) => pattern.test(question))?.[0] || 'general';
  const frame = frames[topic];
  const lens = lenses[card.name];
  const focus = reversed ? lens[1] : lens[0];
  const lead = position === 'past' ? 'For the past position, reflect on how' : position === 'present' ? 'For the present position, consider how' : position === 'future' ? 'For the future position, use this as a possible next-step lens, not a forecast: how could' : 'In relation to';
  const fallbackNote = topic === 'general' ? 'Your question did not match a specific topic, so this is an open reflection rather than a specific answer. ' : '';
  const interpretation = position === 'single'
    ? `${lead} ${frame.context}, ${card.name}${reversed ? ' reversed' : ''} invites you to look at ${focus}. It does not promise an outcome.`
    : `${lead} ${focus} ${position === 'past' ? 'may have shaped' : position === 'present' ? 'may be affecting' : 'help you approach'} ${frame.context}. ${position === 'past' ? 'Use this to review your experience, not to assume what happened.' : position === 'present' ? 'Check this against the facts you can observe today.' : 'This is preparation, not a prediction of the result.'}`;
  return { topic: frame.label, interpretation: fallbackNote + interpretation, guidance: `${lens[2]} ${position === 'single' || topic === 'wellbeing' || topic === 'money' ? frame.action : topic === 'career' ? position === 'past' ? 'Look back at one recent application or interview: what feedback could you use rather than repeating the same approach?' : position === 'present' ? "For your job search today, apply this card's prompt to the next task in front of you: an application, a skills example or a practice answer." : 'Before the next stage of your job search, choose a realistic milestone and the support or information you need to reach it.' : position === 'past' ? `In ${frame.context}, what past experience helps you understand this pattern without assuming it will repeat?` : position === 'present' ? `For ${frame.context}, choose one action you can control today.` : `For ${frame.context}, identify one missing fact or source of support before your next step.`}` };
}
