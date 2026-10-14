// Dependency-free checks of every generated sitemap route and its structural SEO contract.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const errors=[];
for(const url of urls){
 const pathname=new URL(url).pathname;
 const html=fs.readFileSync(path.join(root,pathname,'index.html'),'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/&amp;/g,'&');
 if(!title || title.length>65)errors.push(`${pathname}: title over target or missing`);
 if((html.match(/<h1[\s>]/g)||[]).length!==1)errors.push(`${pathname}: expected one H1`);
 if(!html.includes(`rel="canonical" href="${url}"`))errors.push(`${pathname}: canonical mismatch`);
 for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
  const href=m[1];if(href==='/readings'||path.extname(href))continue;
  if(!fs.existsSync(path.join(root,href,'index.html')))errors.push(`${pathname}: missing internal destination ${href}`);
 }
 const schema=html.match(/<script id="seo-dynamic-json-ld" type="application\/ld\+json">(.*?)<\/script>/s);
 if(!schema){errors.push(`${pathname}: missing schema`);continue;}
 for(const item of JSON.parse(schema[1])){
  if(!item['@context']||!item['@type'])errors.push(`${pathname}: schema context/type missing`);
  if(item['@type']==='BlogPosting' && (!item.headline||!item.image||!item.datePublished||!item.author?.name||!item.mainEntityOfPage))errors.push(`${pathname}: article fields missing`);
  if(item['@type']==='Service' && (!item.name||!item.provider?.name||!item.url))errors.push(`${pathname}: service fields missing`);
  if(item['@type']==='BreadcrumbList')for(const crumb of item.itemListElement){if(!fs.existsSync(path.join(root,new URL(crumb.item).pathname,'index.html')))errors.push(`${pathname}: breadcrumb destination missing`);}
 }
}
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exit(1);}
console.log(`SEO structure checked for ${urls.length} canonical public routes. This is not a Google rich-results eligibility test.`);
