import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Writable} from 'node:stream';
import App from './App';

export function render(url: string): Promise<{html: string; head: any}> {
  (globalThis as any).__SEO_HEAD__ = null;
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    const sink = new Writable({write(chunk, _enc, cb) { chunks.push(chunk.toString()); cb(); }});
    let failed: unknown = null;
    const {pipe} = renderToPipeableStream(
      <StaticRouter location={url}><App /></StaticRouter>,
      {
        onAllReady() { pipe(sink); },
        onShellError(err) { reject(err); },
        onError(err) { failed = err; },
      },
    );
    sink.on('finish', () => {
      if (failed) return reject(failed);
      resolve({html: chunks.join(''), head: (globalThis as any).__SEO_HEAD__});
    });
  });
}
