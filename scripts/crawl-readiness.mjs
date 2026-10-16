import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist'), origin='https://thepsychicstudio.com';
const urls=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const incoming=new Map(urls.map(u=>[new URL(u).pathname,new Set()])), titles=new Map(), errors=[];
if(new Set(urls).size!==urls.length)errors.push('Duplicate sitemap URLs');
for(const url of urls){
 const route=new URL(url).pathname;
 if(!url.startsWith(origin+'/') || new URL(url).search || (route!=='/'&&route.endsWith('/')))errors.push(`Noncanonical sitemap URL: ${url}`);
 const file=path.join(root,route,'index.html');
 if(!fs.existsSync(file)){errors.push(`No prerender: ${route}`);continue;}
 const html=fs.readFileSync(file,'utf8');
 if(!html.includes(`rel="canonical" href="${url}"`))errors.push(`Wrong canonical: ${route}`);
 if(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html))errors.push(`Public route noindex: ${route}`);
 if((html.match(/<h1[\s>]/g)||[]).length!==1)errors.push(`Invalid H1 count: ${route}`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 if(!title)errors.push(`Missing title: ${route}`);
 else if(titles.has(title))errors.push(`Duplicate title: ${route} and ${titles.get(title)}`);
 else titles.set(title,route);
 for(const [,href]of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
  let target;try{target=new URL(href,origin);}catch{continue;}
  if(target.origin===origin&&target.pathname!==route&&incoming.has(target.pathname))incoming.get(target.pathname).add(route);
 }
}
for(const [route,from]of incoming)if(route!=='/'&&!from.size)errors.push(`No incoming server-HTML anchor: ${route}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Crawl-readiness: ${urls.length} canonical prerendered indexable URLs; unique titles; incoming HTML links present. Google indexing/ranking is not guaranteed.`);
