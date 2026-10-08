import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';
import {defineConfig} from 'vite';
export default defineConfig(()=>({
 plugins:[react(),tailwindcss(),{
  name:'responsive-static-artwork',
  async generateBundle(){
   const emit=async(base:string,bytes:Buffer)=>{
    for(const [suffix,width]of [['',1600],['-800',800],['-400',400]]as const){
     const image=await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:83}).toBuffer();
     this.emitFile({type:'asset',fileName:base+suffix+'.webp',source:image});
    }
   };
   for(const folder of ['blog-images','tarot-custom']){
    const dir=path.resolve(__dirname,'public',folder);
    for(const file of fs.readdirSync(dir).filter(n=>/^pack-\d+\.json$/.test(n))){
     const pack:Record<string,string>=JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'));
     for(const [id,uri]of Object.entries(pack)){
      if(!/^[a-z0-9_]+$/.test(id)||!uri.startsWith('data:image/'))throw Error('Invalid artwork pack');
      await emit(`${folder==='blog-images'?'blog-images':'tarot-optimized'}/${id}`,Buffer.from(uri.split(',')[1],'base64'));
     }
    }
   }
   const zodiac:Record<string,string>=JSON.parse(fs.readFileSync(path.resolve(__dirname,'public/perf-assets/zodiac.json'),'utf8'));
   await emit('perf-assets/zodiac',Buffer.from(zodiac.zodiac.split(',')[1],'base64'));
   await emit('tarot-optimized/card_back',fs.readFileSync(path.resolve(__dirname,'public/tarot/card_back.jpg')));
  },
 }],
 resolve:{alias:{'@':path.resolve(__dirname,'.')}},
 server:{hmr:process.env.DISABLE_HMR!=='true',watch:process.env.DISABLE_HMR==='true'?null:{}},
}));
