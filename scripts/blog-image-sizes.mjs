// Responsive derivatives keep original artwork intact. Only blog assets are touched.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const dir=path.resolve('public/blog-images');
let count=0;
for(const name of fs.readdirSync(dir)){
 if(!name.endsWith('.webp')||/-\d{2,4}\.webp$/.test(name)) continue;
 const src=path.join(dir,name),meta=await sharp(src).metadata();
 for(const width of [400,800]){
  const dest=path.join(dir,name.replace('.webp',`-${width}.webp`));
  if(fs.existsSync(dest)&&fs.statSync(dest).mtimeMs>=fs.statSync(src).mtimeMs)continue;
  await sharp(src).resize({width:Math.min(width,meta.width),withoutEnlargement:true}).webp({quality:84,effort:5}).toFile(dest);count++;
 }
}
console.log(`Blog responsive derivatives: ${count} written`);
