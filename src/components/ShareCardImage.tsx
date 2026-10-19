import React, { useState } from 'react';

interface Props {
  name: string;
  keywords: string;
  image: string;
  label?: string;
}

// Builds a 1080x1350 (Instagram portrait) PNG of the drawn card, entirely in the browser.
export const ShareCardImage: React.FC<Props> = ({ name, keywords, image, label }) => {
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    setBusy(true);
    try {
      const W = 1080, H = 1350;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FAF8F5';
      ctx.fillRect(0, 0, W, H);
      // soft green wash at the bottom
      const grad = ctx.createLinearGradient(0, H * 0.55, 0, H);
      grad.addColorStop(0, 'rgba(231,238,210,0)');
      grad.addColorStop(1, 'rgba(201,214,163,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(new Error('img')); img.src = image; });

      // card artwork, centered, with a thin frame
      const cardH = 760;
      const cardW = Math.round((img.width / img.height) * cardH);
      const cx = (W - cardW) / 2, cy = 120;
      ctx.save();
      ctx.shadowColor = 'rgba(74,95,39,.25)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 16;
      ctx.drawImage(img, cx, cy, cardW, cardH);
      ctx.restore();
      ctx.strokeStyle = 'rgba(74,95,39,.35)';
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - 12, cy - 12, cardW + 24, cardH + 24);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#4a5f27';
      ctx.font = '600 34px Georgia, serif';
      ctx.fillText((label || 'YOUR CARD').toUpperCase().split('').join(' '), W / 2, 72);

      ctx.fillStyle = '#1f2322';
      ctx.font = 'italic 600 64px Georgia, serif';
      ctx.fillText(name, W / 2, cy + cardH + 110);

      ctx.fillStyle = 'rgba(31,35,34,.65)';
      ctx.font = '30px Georgia, serif';
      const words = keywords.split(' ');
      let line = '', ly = cy + cardH + 170;
      for (const w of words) {
        if (ctx.measureText(line + ' ' + w).width > W - 220) { ctx.fillText(line, W / 2, ly); ly += 44; line = w; }
        else line = line ? line + ' ' + w : w;
      }
      ctx.fillText(line, W / 2, ly);

      ctx.fillStyle = 'rgba(31,35,34,.45)';
      ctx.font = '26px Georgia, serif';
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      ctx.fillText(`${today}  ·  thepsychicstudio.com`, W / 2, H - 60);

      const a = document.createElement('a');
      a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-card.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={generate}
      disabled={busy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1f2322]/20 text-sm font-semibold text-[#1f2322] hover:bg-[#1f2322]/5 disabled:opacity-40"
    >
      {busy ? 'Making image...' : 'Download as image'}
    </button>
  );
};
