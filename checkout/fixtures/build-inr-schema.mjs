import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const target=process.argv[2];
if(!target||!target.startsWith('/tmp/psychic-inr-proof/'))throw Error('Output must stay in /tmp/psychic-inr-proof/');
const source=readFileSync(new URL('../migrations/0001_orders.sql',import.meta.url),'utf8');
if((source.match(/CHECK\(currency='USD'\)/g)||[]).length!==1)throw Error('Unexpected currency schema');
mkdirSync('/tmp/psychic-inr-proof',{recursive:true});
writeFileSync(target,source.replace("CHECK(currency='USD')","CHECK(currency='INR')"));
console.log('Disposable INR-only schema generated. Normal USD schema unchanged.');
