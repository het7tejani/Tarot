import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Writable} from 'node:stream';
import App from './App';
import {DailyCardDateProvider, localDayKey} from './contexts/DailyCardDate';

export function render(url: string): Promise<{html: string; head: any; dailyCardDayKey: number}> {
  (globalThis as any).__SEO_HEAD__ = null;
  const dailyCardDayKey = localDayKey();
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    const sink = new Writable({write(chunk, _enc, cb) { chunks.push(chunk.toString()); cb(); }});
    let failed: unknown = null;
    const {pipe} = renderToPipeableStream(
      <DailyCardDateProvider initialDayKey={dailyCardDayKey}><StaticRouter location={url}><App /></StaticRouter></DailyCardDateProvider>,
      {
        onAllReady() { pipe(sink); },
        onShellError(err) { reject(err); },
        onError(err) { failed = err; },
      },
    );
    sink.on('finish', () => {
      if (failed) return reject(failed);
      resolve({html: chunks.join(''), head: (globalThis as any).__SEO_HEAD__, dailyCardDayKey});
    });
  });
}
