import crypto from 'node:crypto';
const REPO='het7tejani/Tarot';
const BRANCH=process.env.CMS_BRANCH||'main';
const cookieName='studio_admin';
const slugPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const secureEquals=(a,b)=>{const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y)};
function sessionToken(secret){const payload=Buffer.from(JSON.stringify({exp:Date.now()+8*60*60*1000})).toString('base64url');return payload+'.'+crypto.createHmac('sha256',secret).update(payload).digest('base64url')}
function validSession(req,secret){const token=(req.headers.cookie||'').split(';').map(c=>c.trim()).find(c=>c.startsWith(cookieName+'='))?.slice(cookieName.length+1);if(!token)return false;const [payload,signature]=token.split('.');if(!payload||!signature||!secureEquals(signature,crypto.createHmac('sha256',secret).update(payload).digest('base64url')))return false;try{return JSON.parse(Buffer.from(payload,'base64url').toString()).exp>Date.now()}catch{return false}}
function decodePost(file){const raw=Buffer.from(file.content,'base64').toString('utf8').replace(/\r\n/g,'\n');const m=raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);const field=k=>{const v=m?.[1].match(new RegExp('^'+k+':\\s*(.*?)\\s*$','m'))?.[1]||'';if(v.startsWith('"')){try{return JSON.parse(v)}catch{}}return v.replace(/^'|'$/g,'')};return {slug:file.name.replace(/\.md$/,''),title:field('title'),category:field('category'),date:field('date'),excerpt:field('excerpt'),metaTitle:field('metaTitle'),coverImage:field('coverImage'),content:m?.[2].trim()||raw,published:field('published')!=='false',sha:file.sha,raw}}
const RATE_WINDOW_MS=60000,RATE_MAX=10,hits=new Map();
function rateLimited(req){const ip=(req.headers['x-forwarded-for']||'').split(',')[0].trim()||'anon';const now=Date.now();const recent=(hits.get(ip)||[]).filter(t=>now-t<RATE_WINDOW_MS);if(recent.length>=RATE_MAX)return true;recent.push(now);hits.set(ip,recent);return false}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Robots-Tag','noindex, nofollow');
 const send=(status,value)=>res.status(status).json(value);
 if(req.method!=='POST')return send(405,{error:'Use POST.'});
 const expectedOrigin=process.env.CMS_ORIGIN||'https://thepsychicstudio.com';
 if(req.headers.origin!==expectedOrigin)return send(403,{error:'This request did not come from the admin site.'});
 if(rateLimited(req))return send(429,{error:'Too many attempts. Wait a minute and try again.'});
 const password=process.env.CMS_ADMIN_PASSWORD;
 const hash=process.env.CMS_PASSWORD_HASH,secret=process.env.CMS_SESSION_SECRET,token=process.env.CMS_GITHUB_TOKEN;
 if((!hash&&!password)||!secret||!token)return send(503,{error:'Admin setup is not complete. No changes have been made.'});
 let input=req.body;try{if(typeof input==='string')input=JSON.parse(input)}catch{return send(400,{error:'Invalid request.'})}
 if(!input||typeof input!=='object')return send(400,{error:'Invalid request.'});
 if(input.action==='login'){
   // Use a scrypt hash (salt:hexDigest), never a password shipped in frontend code.
   const [salt,digest]=(hash||'').split(':');let match=false;
   if(!hash&&password&&typeof input.password==='string'&&input.password.length<=256){const salt=crypto.randomBytes(16);const derive=value=>new Promise((resolve,reject)=>crypto.scrypt(value,salt,64,(e,b)=>e?reject(e):resolve(b.toString('hex'))));match=secureEquals(await derive(input.password),await derive(password));}
   if(typeof input.password==='string'&&input.password.length<=256&&salt&&digest){const candidate=await new Promise((resolve,reject)=>crypto.scrypt(input.password,salt,64,(e,b)=>e?reject(e):resolve(b.toString('hex'))));match=secureEquals(candidate,digest)}
   if(!match)return send(401,{error:'Password not accepted.'});
   res.setHeader('Set-Cookie',`${cookieName}=${sessionToken(secret)}; HttpOnly; Secure; Path=/api/blog-admin; SameSite=Strict; Max-Age=28800`);return send(200,{ok:true});
 }
 if(input.action==='logout'){res.setHeader('Set-Cookie',`${cookieName}=; HttpOnly; Secure; Path=/api/blog-admin; SameSite=Strict; Max-Age=0`);return send(200,{ok:true})}
 if(!validSession(req,secret))return send(401,{error:'Sign in again to continue.'});
 const gh=async(endpoint,method='GET',body)=>{const r=await fetch(`https://api.github.com/repos/${REPO}/${endpoint}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok){const e=new Error(r.status===409||r.status===422?'Another change landed first. Reload the post and try again.':'Source update failed. Check setup and try again.');e.status=r.status===409||r.status===422?409:502;throw e}return data};
 try{
  if(input.action==='list'){const listing=await gh(`contents/content/blog?ref=${BRANCH}`);const posts=await Promise.all(listing.filter(f=>f.name.endsWith('.md')).map(async file=>decodePost(await gh(`contents/content/blog/${file.name}?ref=${BRANCH}`))));return send(200,{posts:posts.map(({raw,...post})=>post)})}
  if(!['save','delete'].includes(input.action))return send(400,{error:'Unknown action.'});
  const post=input.post,slug=input.action==='delete'?input.slug:post?.slug,originalSlug=input.originalSlug||(input.action==='delete'?slug:undefined);
  if(typeof slug!=='string'||!slugPattern.test(slug)||(originalSlug&&!slugPattern.test(originalSlug)))return send(400,{error:'Invalid article URL slug.'});
  const ref=await gh(`git/ref/heads/${BRANCH}`);const parent=ref.object.sha;const commit=await gh(`git/commits/${parent}`);const tree=await gh(`git/trees/${commit.tree.sha}?recursive=1`);if(tree.truncated)return send(503,{error:'The source listing is too large. No changes made.'});
  const existing=originalSlug?tree.tree.find(f=>f.path===`content/blog/${originalSlug}.md`):undefined;
  if(originalSlug&&(!existing||existing.sha!==input.sha))return send(409,{error:'This post changed since you opened it. Reload before saving.'});
  if(slug!==originalSlug&&tree.tree.some(f=>f.path===`content/blog/${slug}.md`))return send(409,{error:'That article URL already exists.'});
  const entries=[];
  if(input.action==='delete')entries.push({path:`content/blog/${slug}.md`,mode:'100644',type:'blob',sha:null});
  else{
   for(const key of ['title','excerpt','content'])if(typeof post[key]!=='string'||!post[key].trim())return send(400,{error:'Add a title, short summary and article text.'});
   if(post.content.length>150000||!/^\d{4}-\d{2}-\d{2}$/.test(post.date)||typeof post.published!=='boolean')return send(400,{error:'Invalid article data.'});
   const uploads=input.uploads||[];if(!Array.isArray(uploads)||uploads.length>3)return send(400,{error:'Upload at most three photos per save.'});
   for(const upload of uploads){if(!/^blog-\d+-[a-f0-9]{8}\.(jpg|png|webp)$/.test(upload.name))return send(400,{error:'Invalid photo filename.'});const m=upload.data?.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);if(!m)return send(400,{error:'Invalid photo file.'});const bytes=Buffer.from(m[2],'base64');if(bytes.length>1024*1024)return send(400,{error:'A photo is larger than 1 MB.'});const magic=m[1]==='jpeg'?bytes.subarray(0,3).toString('hex')==='ffd8ff':m[1]==='png'?bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a':bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP';if(!magic)return send(400,{error:'The photo is not a valid image.'});const blob=await gh('git/blobs','POST',{content:m[2],encoding:'base64'});entries.push({path:`public/uploads/${upload.name}`,mode:'100644',type:'blob',sha:blob.sha})}
   // Preserve unknown frontmatter on edits, so fields used elsewhere are not silently lost.
   let originalRaw='';if(existing){const file=await gh(`contents/content/blog/${originalSlug}.md?ref=${parent}`);originalRaw=Buffer.from(file.content,'base64').toString('utf8')}
   const m=originalRaw.replace(/\r\n/g,'\n').match(/^---\n([\s\S]*?)\n---\n?/);let lines=m?m[1].split('\n'):[];
   for(const key of ['title','category','date','excerpt','metaTitle','coverImage','published']){const value=typeof post[key]==='boolean'?String(post[key]):JSON.stringify(String(post[key]||''));const idx=lines.findIndex(line=>line.startsWith(key+':'));if(idx<0)lines.push(`${key}: ${value}`);else lines[idx]=`${key}: ${value}`}
   const raw=`---\n${lines.join('\n')}\n---\n\n${post.content.trim()}\n`;const blob=await gh('git/blobs','POST',{content:raw,encoding:'utf-8'});entries.push({path:`content/blog/${slug}.md`,mode:'100644',type:'blob',sha:blob.sha});if(originalSlug&&slug!==originalSlug)entries.push({path:`content/blog/${originalSlug}.md`,mode:'100644',type:'blob',sha:null});
  }
  const newTree=await gh('git/trees','POST',{base_tree:commit.tree.sha,tree:entries});const next=await gh('git/commits','POST',{message:`${input.action==='delete'?'Remove':'Update'} blog article: ${slug}`,tree:newTree.sha,parents:[parent]});await gh(`git/refs/heads/${BRANCH}`,'PATCH',{sha:next.sha,force:false});return send(200,{ok:true,commit:next.sha});
 }catch(e){return send(e.status||502,{error:e.message||'Save failed. Check current source before trying again.'})}
}
