import React, { useEffect, useRef, useState } from 'react';
import { CUSTOM_CARD_PACKS } from '../data/customCardPacks';
const packs = new Map<string, Promise<Record<string,string>>>();
const blank = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><rect width="600" height="900" rx="22" fill="#f6f1e1"/><rect x="14" y="14" width="572" height="872" rx="18" fill="none" stroke="#b69d64"/><path d="M300 310L320 430L440 450L320 470L300 590L280 470L160 450L280 430Z" fill="#a4b080"/></svg>');
export const TarotArtwork: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { src: string }> = ({src,onError,...props}) => {
  const slug = src.match(/\/tarot\/([^/.]+)/)?.[1];
  const pack = slug && CUSTOM_CARD_PACKS[slug];
  const [resolved,setResolved] = useState<string>();
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setResolved(undefined); if (!pack) return;
    let live=true; let started=false;
    const load=() => { if(started)return;started=true;
      if(!packs.has(pack)) packs.set(pack,fetch(`/tarot-custom/${pack}.json`).then(r=>{if(!r.ok)throw new Error('Artwork unavailable');return r.json();}));
      packs.get(pack)!.then(data=>{if(live && slug && data[slug])setResolved(data[slug]);}).catch(()=>{if(live)setResolved(blank);});
    };
    if(props.loading!=='lazy' || !('IntersectionObserver' in window)){load();return()=>{live=false;};}
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){load();observer.disconnect();}},{rootMargin:'250px'});
    if(ref.current) observer.observe(ref.current);return()=>{live=false;observer.disconnect();};
  },[slug,pack,props.loading]);
  return <img {...props} ref={ref} src={pack ? resolved || blank : slug?.includes("_of_") ? "/tarot/card_back.jpg" : src} onError={pack ? undefined : onError} />;
};
