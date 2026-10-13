import React from 'react';
import {CUSTOM_CARD_PACKS} from '../data/customCardPacks';
export const TarotArtwork:React.FC<React.ImgHTMLAttributes<HTMLImageElement>&{src:string}>=({src,style,sizes:sizesProp,...props})=>{
 const blog=src.match(/\/blog-images\/(\d+)\.webp/)?.[1];
 const slug=src.match(/\/tarot\/([^/.]+)/)?.[1];
 const custom=slug&&CUSTOM_CARD_PACKS[slug];
 const base=blog?`/blog-images/${blog}`:custom?`/tarot-optimized/${slug}`:slug==='card_back'?'/tarot-optimized/card_back':null;
 const portrait=!!custom||slug==='card_back';
 return <img decoding="async" {...props} src={base?base+'.webp':src} srcSet={base?(portrait?`${base}-400.webp 400w, ${base}-560.webp 560w, ${base}-800.webp 800w, ${base}.webp 1600w`:`${base}-400.webp 400w, ${base}-800.webp 800w, ${base}.webp 1600w`):undefined} sizes={sizesProp||(blog?'(max-width: 700px) 100vw, (max-width: 1100px) 60vw, 900px':portrait?'(max-width: 700px) 220px, 280px':undefined)} style={{...(portrait?{aspectRatio:'600 / 900',objectFit:'cover'}:{}),...style,...(blog==='5712829'?{objectPosition:'center 70%'}:{})}} />;
};
