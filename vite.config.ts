import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import {generateSitemap} from './scripts/sitemap.mjs';
import sharp from 'sharp';
import {defineConfig} from 'vite';
export default defineConfig(({isSsrBuild})=>({
 plugins:[react(),tailwindcss(),{
  name:'published-journal-link-index',
  resolveId(id){if(id==='virtual:journal-links')return '\0virtual:journal-links'},
  load(id){
   if(id!=='\0virtual:journal-links')return;
   const dir=path.resolve(__dirname,'content/blog');
   const posts=fs.readdirSync(dir).filter(f=>f.endsWith('.md')).flatMap(file=>{
    const raw=fs.readFileSync(path.join(dir,file),'utf8').replace(/\r\n/g,'\n');
    const front=raw.match(/^---\n([\s\S]*?)\n---/)?.[1]||'';
    if(/^published:\s*["']?false["']?\s*$/m.test(front))return [];
    const title=(front.match(/^title:\s*(.*)$/m)?.[1]||'').trim().replace(/^(["'])(.*)\1$/,'$2').replace(/\\"/g,'"');
    return title?[{slug:file.replace(/\.md$/,''),title}]:[];
   });
   return 'export default '+JSON.stringify(posts);
  }
 },{
  name:'exclude-private-blog-drafts', enforce:'pre',
  load(id){
   if(id.includes('/content/blog/') && id.includes('?raw')){
    const raw=fs.readFileSync(id.split('?')[0],'utf8');
    const front=raw.replace(/\r\n/g,'\n').match(/^---\n([\s\S]*?)\n---/);
    if(front && /^published:\s*["']?false["']?\s*$/m.test(front[1])) return 'export default '+JSON.stringify('---\npublished: false\n---\n');
   }
  }
 },{
  name:'responsive-static-artwork',
  async generateBundle(){
   if(isSsrBuild)return;
   this.emitFile({type:'asset',fileName:'sitemap.xml',source:generateSitemap(__dirname)});
   const stock:Record<string,string>=JSON.parse(fs.readFileSync(path.resolve(__dirname,'public/reading-stock.json'),'utf8'));
   for(const [id,encoded] of Object.entries(stock))this.emitFile({type:'asset',fileName:`reading-images/${id}.webp`,source:Buffer.from(encoded,'base64')});
   const logos:Record<string,string>=JSON.parse(fs.readFileSync(path.resolve(__dirname,'public/logo-assets.json'),'utf8'));
   for(const [file,encoded] of Object.entries(logos)){
    if(!/^(favicon-(16|32|48)\.png|favicon\.ico|apple-touch-icon-180\.png|navbar-480\.png|hamsa\.svg)$/.test(file))throw Error('Invalid logo asset');
    this.emitFile({type:'asset',fileName:file,source:Buffer.from(encoded,'base64')});
    if(file==='navbar-480.png'){for(const width of [96,192])this.emitFile({type:'asset',fileName:`navbar-${width}.webp`,source:await sharp(Buffer.from(encoded,'base64')).resize({width}).webp({quality:85}).toBuffer()});}
   }
   const emit=async(base:string,bytes:Buffer)=>{
    for(const [suffix,width]of [['',1600],['-800',800],['-560',560],['-400',400],['-240',240]]as const){
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
   await emit('perf-assets/halloween-reading',fs.readFileSync(path.resolve(__dirname,'public/halloween-reading.webp')));
   await emit('tarot-optimized/card_back',fs.readFileSync(path.resolve(__dirname,'public/tarot/card_back.jpg')));
  },
 }],
 build:isSsrBuild?{}:{rollupOptions:{output:{manualChunks(id:string){if(id.includes('node_modules')){if(/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id))return 'vendor-react';if(/[\\/](motion|framer-motion|lucide-react|@google\/genai)[\\/]/.test(id))return 'vendor-ui';}}}}},
 resolve:{alias:{'@':path.resolve(__dirname,'.')}},
 server:{hmr:process.env.DISABLE_HMR!=='true',watch:process.env.DISABLE_HMR==='true'?null:{}},
}));
