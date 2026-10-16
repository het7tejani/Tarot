import React, {createContext, useContext, useEffect, useState} from 'react';

export const localDayKey = (date = new Date()) =>
  date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

const DailyCardDayContext = createContext<number | null>(null);

// The first browser render must use the date embedded in the static HTML,
// even when that HTML was built on an earlier day or in another timezone.
export function DailyCardDateProvider({initialDayKey, children}: {
  initialDayKey: number;
  children: React.ReactNode;
}) {
  const [dayKey, setDayKey] = useState(initialDayKey);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      setDayKey(localDayKey());
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = setTimeout(refresh, nextMidnight.getTime() - now.getTime() + 50);
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    refresh();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return <DailyCardDayContext.Provider value={dayKey}>{children}</DailyCardDayContext.Provider>;
}

export function useDailyCardDay() {
  const dayKey = useContext(DailyCardDayContext);
  if (dayKey === null) throw new Error('Daily cards need DailyCardDateProvider');
  return dayKey;
}
