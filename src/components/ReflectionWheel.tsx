import React, { useState } from 'react';
import { FREE_TAROT_CARDS } from '../data/readingsData';
import { questionReading } from '../data/questionTarot';
import { TarotArtwork } from './TarotArtwork';
import { WheelEmblem } from './WheelEmblem';

const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const glyphs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const themes = ['Career','Love','Money','Learning','Family','Change'];
const situations: Record<string, string[]> = {
  Career: ['Finding a job','Interview nerves','Changing career','Work burnout','A difficult boss','Starting a business'],
  Love: ['New relationship','Communication','After a breakup','Feeling uncertain','Setting boundaries','Making time'],
  Money: ['Budget pressure','Money worries','Saving habits','An uncertain income','Spending habits','Finding stability'],
  Learning: ['Exam pressure','Finding focus','A new course','Losing motivation','Learning a skill','Choosing a path'],
  Family: ['Family tension','Friendship distance','Being heard','Setting boundaries','Supporting someone','Reconnecting'],
  Change: ['A big decision','Moving forward','Feeling stuck','Starting again','Letting go','An unknown path'],
};
const situationActions: Record<string,string> = {
  'Finding a job':'Choose one suitable vacancy and show how your experience meets its requirements.',
  'Interview nerves':'Practise a short example of a problem you handled and what you learned.',
  'Changing career':'Speak with someone in the field before committing to a costly change.',
  'Work burnout':'Identify one demand you can discuss, reduce or postpone; seek support if exhaustion persists.',
  'A difficult boss':'Keep a factual note of the issue and plan a calm, specific request.',
  'Starting a business':'Test one assumption with a small experiment before spending heavily.',
  'New relationship':'Notice whether actions and expectations match, without rushing a conclusion.',
  'Communication':"Choose one concrete concern and describe it without guessing the other person's motives.",
  'After a breakup':'Give yourself room to recover and choose one source of support.',
  'Feeling uncertain':'Separate what your partner has said from what you are assuming.',
  'Setting boundaries':'Name one limit you can explain calmly and follow consistently.',
  'Making time':'Suggest a realistic time to connect and ask what works for both of you.',
  'Budget pressure':'Gather accurate amounts before drawing conclusions; this is not financial advice.',
  'Money worries':'Write down the specific concern and take complex decisions to a qualified adviser.',
  'Saving habits':'Reflect on one repeatable habit rather than expecting a quick fix.',
  'An uncertain income':'Gather the facts about the uncertainty and seek qualified advice where needed.',
  'Spending habits':'Notice the feeling or trigger behind a recent choice without judging yourself.',
  'Finding stability':'Identify what stability means to you before comparing your situation with others.',
  'Exam pressure':'Choose one small practice task and check your answer before moving on.',
  'Finding focus':'Remove one distraction and set a short, realistic practice session.',
  'A new course':'Check the requirements and try an introductory lesson before deciding.',
  'Losing motivation':'Make the next task smaller and ask what is making it hard to begin.',
  'Learning a skill':'Practise one part of the skill and get specific feedback.',
  'Choosing a path':'Compare what you want to learn with the real demands of each option.',
  'Family tension':'Choose a calmer time to discuss one issue rather than every disagreement.',
  'Friendship distance':'Offer one low-pressure invitation without assuming why someone has been distant.',
  'Being heard':'State your need plainly and ask whether the other person has understood it.',
  'Supporting someone':'Ask what support they want rather than deciding for them.',
  'Reconnecting':'Begin with a small, respectful invitation and allow the other person a choice.',
  'A big decision':'List the options and the missing information before choosing.',
  'Moving forward':'Choose one reversible step that helps you learn what comes next.',
  'Feeling stuck':'Identify one assumption or routine you could test differently.',
  'Starting again':'Keep one lesson from the past and begin with a manageable task.',
  'Letting go':'Name what you can stop carrying without forcing an immediate decision.',
  'An unknown path':'Find one reliable source of information and one person you can ask for perspective.',
};
const energy = ['Fire · courage','Earth · steadiness','Air · clarity','Water · compassion'];
const intentions = ['One small step','A new perspective','A boundary','A steady routine'];
const stages = ['Your sign','Your theme','Your situation','Your energy','Your intention'];
const descriptions = ['Begin with your zodiac sign. It is a symbolic starting point, not a prediction.', 'What is asking for your attention?', 'Choose the part that feels closest to your question.', 'Choose an element as a reflection style, not a claim about your energy.', 'What would feel useful to take away today?'];
const energyActions: Record<string,string> = {
  'Fire · courage':'Try one small action you have been putting off, within a safe and realistic limit.',
  'Earth · steadiness':'Keep your next step manageable and give it a place in your routine.',
  'Air · clarity':'Write down what you know, what you assume, and the one fact you still need.',
  'Water · compassion':'Make room for your feelings without treating them as proof of an outcome.',
};
const intentActions: Record<string,string> = {
  'One small step':'Choose a step you can complete today, not the whole answer at once.',
  'A new perspective':'Ask what another practical interpretation of the situation could be.',
  'A boundary':'Name one limit that protects your time, attention or wellbeing.',
  'A steady routine':'Pick a short repeatable habit and review whether it helps.',
};
export const ReflectionWheel: React.FC = () => {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [rotation, setRotation] = useState(0);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rings = [signs, themes, situations[choices[1]] || situations.Career, energy, intentions];
  const radii = [44, 37, 29, 22, 16];
  const pick = (ring: number, index: number) => {
    if (ring > step || spinning) return;
    const option = rings[ring][index];
    setChoices(previous => [...previous.slice(0, ring), option]);
    setStep(Math.min(ring + 1, 4));
    setRotation(previous => previous + 360);
    setSpinning(true);
    window.setTimeout(()=>setSpinning(false),1000);
  };
  const advance = () => {
    if (choices.length < 5) return;
    setSpinning(true); setRotation(previous => previous + 720);
    window.setTimeout(() => { setCardIndex(Math.floor(Math.random() * FREE_TAROT_CARDS.length)); setSpinning(false); }, 1800);
  };
  const reset = () => {setStep(0);setChoices([]);setRotation(0);setCardIndex(null);};
  const card = cardIndex === null ? null : FREE_TAROT_CARDS[cardIndex];
  const question = `${choices[1]}: ${choices[2]}`;
  const reading = card ? questionReading(card, question, false, 'single') : null;
  return <section className="st-reflection-wheel" aria-labelledby="reflection-wheel-heading">
    <div className="st-wheel-intro"><span className="eyebrow">A different way to reflect</span><h2 id="reflection-wheel-heading">The circle of perspective</h2><p>Five choices. One card. A practical next step for the question you are carrying.</p></div>
    <ol className="st-wheel-progress st-wheel-hidden-progress" aria-label="Reflection steps">{stages.map((stage,index)=><li key={stage} className={index <= step ? 'on' : ''}><span>{choices[index] ? '✓' : index + 1}</span>{stage}</li>)}</ol>
    {card && reading ? <div className="st-wheel-result" aria-live="polite">
      <TarotArtwork src={card.image} alt={`${card.name} tarot card`} sizes="220px" />
      <div><span className="eyebrow">Your reflection · {choices[0]}</span><h3>{card.name}</h3><p className="st-wheel-chosen-question">{choices[1]} · {choices[2]}</p><p>{reading.interpretation}</p><p>{reading.guidance}</p><p>{situationActions[choices[2]]}</p><h4>Your next step</h4><p>{energyActions[choices[3]]} {intentActions[choices[4]]}</p><p className="st-wheel-note">Your sign sets a symbolic starting point. Your situation, chosen element and intention shape this reflection. The card is drawn at random; this is not a personal prediction.</p><button type="button" className="btn" onClick={reset}>Begin a new reflection</button></div>
    </div> : <div className={`st-wheel-experience st-wheel-contained ${expanded?'expanded':''}`}>
      <div className={`st-wheel-stage st-wheel-depth-${step} ${spinning?'is-spinning':''} ${choices.length===5?'is-complete':''}`}>
        <div className="st-wheel-aura" aria-hidden="true"/>
        <div className="st-wheel-pointer" aria-hidden="true">✦</div>
        <div className="st-wheel-tilt"><div className="st-wheel-rim" aria-hidden="true"/><div className="st-choice-orbit" style={{transform:`rotate(${rotation}deg)`}}>
          <svg className="st-choice-disc" viewBox="0 0 600 600" aria-hidden="true">
            <defs><radialGradient id="reflection-disc"><stop offset="0" stopColor="#fffefa"/><stop offset=".78" stopColor="#f8f5e9"/><stop offset="1" stopColor="#e7dfc7"/></radialGradient><linearGradient id="reflection-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ede1b9"/><stop offset=".3" stopColor="#ad8c51"/><stop offset=".55" stopColor="#faf1d5"/><stop offset="1" stopColor="#6e542f"/></linearGradient></defs>
            <circle cx="300" cy="300" r="296" fill="url(#reflection-disc)" stroke="#574f3e" strokeWidth="1.2"/>
            <circle cx="300" cy="300" r="294" fill="none" stroke="url(#reflection-metal)" strokeWidth="9"/>
            {[264,223,181,140,96].map((radius,index)=><circle key={radius} cx="300" cy="300" r={radius} fill="none" stroke={index===step?'#c7a35f':'#988269'} strokeWidth={index===step?'31':'23'} opacity={index===step?'.2':'.06'}/>)}
            <circle className="st-ring-light" cx="300" cy="300" r={[264,223,181,140,96][step]} fill="none" stroke="#ad8745" strokeWidth="2.5" strokeDasharray="6 8" opacity=".85"/>
            {[292,285,257,253,209,205,164,160,122,118,78,74].map((radius,index)=><circle key={radius} cx="300" cy="300" r={radius} fill="none" stroke={index%3===0?'#a2824e':'#574f3e'} strokeWidth=".8" opacity=".8"/>)}
            <g fill="none" stroke="#574f3e" strokeWidth=".7" opacity=".24">{Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30} 300 300)`}><path d="M300 21Q260 100 300 162Q340 100 300 21Z"/><path d="M300 26 282 64 300 101 318 64Z"/><circle cx="300" cy="180" r="65"/><path d="M300 127 349 212 251 212ZM300 240 251 155 349 155Z"/></g>)}</g>
            {Array.from({length:96},(_,i)=><line key={i} x1="300" y1="8" x2="300" y2={i%8===0?'20':'13'} stroke="#574f3e" strokeWidth=".8" transform={`rotate(${i*3.75} 300 300)`}/>)}
            {rings.flatMap((options,ring)=>options.map((_,index)=><g key={`${ring}-${index}`} transform={`rotate(${(index+.5)*360/options.length+(ring===2?30:ring===3||ring===4?45:0)} 300 300)`}><line x1="300" y1={300-(radii[ring]+4)*6} x2="300" y2={300-(radii[ring]-4)*6} stroke="#574f3e" opacity=".45"/><path d={`M300 ${300-radii[ring]*6-6}l4 6-4 6-4-6Z`} fill="#a2824e" opacity=".5"/></g>))}
          </svg>
          <div className="st-wheel-light-sweep" aria-hidden="true"/>
          {rings.map((options,ring)=><div key={ring} className={`st-concentric-ring choice-layer-${ring} ${ring===step?'active':''} ${ring>step?'waiting':''}`} role="group" aria-label={stages[ring]}>{options.map((option,index)=>{
            const angle=index*360/options.length+(ring===2?30:ring===3||ring===4?45:0);
            const short = ring===3 ? option.split(' · ')[0] : ring===4 ? ['Step','View','Limit','Habit'][index] : option;
            return <button type="button" key={option} className={'st-concentric-choice'+(choices[ring]===option?' selected':'')} aria-label={option} title={option} aria-pressed={choices[ring]===option} style={{left:`${50+radii[ring]*Math.sin(angle*Math.PI/180)}%`,top:`${50-radii[ring]*Math.cos(angle*Math.PI/180)}%`,transform:`translate(-50%,-50%) rotate(${-rotation}deg)`}} onClick={()=>pick(ring,index)} disabled={ring>step||spinning}>{ring===1&&<WheelEmblem kind={index} className="st-theme-emblem"/>}{ring===0&&<span className="st-orbit-glyph" aria-hidden="true">{glyphs[index]}</span>}<span>{short}</span></button>;
          })}</div>)}
        </div><div className="st-wheel-core st-concentric-core st-wheel-centre-controls">
          <WheelEmblem kind={3} className="st-centre-emblem"/>
          <span className="st-centre-stage">{choices.length===5 ? 'Circle complete' : `${step+1} · ${stages[step]}`}</span>
          <p>{choices.length===5 ? 'Your card awaits' : 'Tap the lit ring'}</p><div className="st-centre-progress" aria-hidden="true">{stages.map((_,i)=><i key={i} className={choices[i]?'chosen':i===step?'current':''}/>)}</div>
          <button type="button" disabled={spinning} onClick={choices.length===5?advance:()=>pick(step,Math.floor(Math.random()*rings[step].length))}>{spinning?'Drawing...':choices.length===5?'Reveal card':'Spin & choose'}</button>
          <button type="button" className="st-wheel-zoom" onClick={()=>{setExpanded(!expanded);window.setTimeout(()=>{const el=document.querySelector('.st-wheel-contained');if(el)el.scrollLeft=expanded?0:(el.scrollWidth-el.clientWidth)/2;},50);}}>{expanded?'Fit circle':'Enlarge circle'}</button>
        </div></div>
        <div className="st-wheel-floor" aria-hidden="true" />
      </div>

    </div>}
    <p className="st-wheel-note st-wheel-disclaimer">For entertainment and personal reflection. Not a guaranteed solution or medical, legal, financial or mental health advice. All choices are processed in your browser, with no paid service.</p>
  </section>;
};
