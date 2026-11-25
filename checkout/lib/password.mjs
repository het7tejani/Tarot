import {scrypt as scryptCallback,randomBytes,timingSafeEqual} from 'node:crypto';import {promisify} from 'node:util';
const scrypt=promisify(scryptCallback);
export async function hashPassword(password){if(typeof password!=='string'||password.length<16||password.length>256)throw Error('invalid_password');const salt=randomBytes(16).toString('hex');return salt+':'+(await scrypt(password,salt,64)).toString('hex');}
export async function checkPassword(password,hash){if(typeof password!=='string'||password.length>256||typeof hash!=='string')return false;const [salt,digest]=hash.split(':');if(!/^[a-f0-9]{32}$/.test(salt||'')||!/^[a-f0-9]{128}$/.test(digest||''))return false;return timingSafeEqual(await scrypt(password,salt,64),Buffer.from(digest,'hex'));}
