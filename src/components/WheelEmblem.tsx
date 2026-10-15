import React from 'react';

// Original geometric drawings, kept separate from the choice labels.
export const WheelEmblem: React.FC<{kind:number;className?:string}> = ({kind,className}) => <svg className={className} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <circle cx="40" cy="40" r="36"/><circle cx="40" cy="40" r="32"/>
  {kind===0&&<><path d="M40 8 46 22 61 15 58 30 74 40 58 47 62 64 47 58 40 73 33 58 17 65 22 48 7 40 22 31 17 16 33 22Z"/><circle cx="40" cy="40" r="17"/><path d="M28 36q5-5 10 0m4 0q5-5 10 0M40 36l-3 9h6m-8 5q5 4 10 0"/><circle cx="33" cy="36" r="1"/><circle cx="47" cy="36" r="1"/></>}
  {kind===1&&<><path d="M48 11C15 16 12 60 46 68 26 53 25 30 48 11Z"/><path d="M33 38q13-12 26 0-13 12-26 0Z"/><circle cx="46" cy="38" r="5"/><path d="m59 17 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="m57 53 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/></>}
  {kind===2&&<><path d="m40 12 25 45H15ZM40 68 15 23h50Z"/><circle cx="40" cy="40" r="12"/><path d="M24 40q16-16 32 0-16 16-32 0Z"/><circle cx="40" cy="40" r="5"/></>}
  {kind===3&&<><path d="M40 12 67 62H13Z"/><path d="M20 45q20-22 40 0-20 22-40 0Z"/><circle cx="40" cy="45" r="8"/><circle cx="40" cy="45" r="3"/><path d="M40 7V3M14 26l-5-3m57 3 5-3M40 71v5"/></>}
  {kind===4&&<><path d="M38 31C27 17 13 18 14 37c0 9 15 12 23 9-16 1-20 11-13 16 6 5 12-6 15-14m3-17c11-14 25-13 24 6 0 9-15 12-23 9 16 1 20 11 13 16-6 5-12-6-15-14"/><ellipse cx="40" cy="42" rx="3" ry="18"/><path d="m39 26-7-10m9 10 7-10M19 29l13 11m29-11L48 40M20 37l12 6m28-6-12 6"/></>}
  {kind===5&&<><path d="M40 9 47 31 70 31 51 45 58 68 40 54 22 68 29 45 10 31 33 31Z"/><circle cx="40" cy="40" r="17"/><path d="M28 40q12-12 24 0-12 12-24 0Z"/><circle cx="40" cy="40" r="4"/></>}
</svg>;
