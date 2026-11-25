import {createHash} from 'node:crypto';
import {CheckoutError} from './payment.mjs';
export async function storePrivatePdf(db,record,bytes){
 const commands=[db.prepare('INSERT INTO order_files(id,order_id,object_key,sha256,bytes,state,created_at) VALUES(?,?,?,?,?,?,?)').bind(record.id,record.orderId,'d1:'+record.id,record.sha256,bytes.length,'draft',record.now)];
 for(let offset=0,index=0;offset<bytes.length;offset+=128*1024,index++)commands.push(db.prepare('INSERT INTO pdf_chunks(file_id,ordinal,data) VALUES(?,?,?)').bind(record.id,index,bytes.slice(offset,offset+128*1024).buffer));
 if(record.actor){commands.push(db.prepare('INSERT INTO admin_audit(id,actor_id,order_id,action,created_at) VALUES(?,?,?,?,?)').bind(record.auditId,record.actor,record.orderId,'pdf_draft:'+record.id,record.now));}
 await db.batch(commands);
}
export async function readPrivatePdf(db,fileId){const file=await db.prepare('SELECT * FROM order_files WHERE id=?').bind(fileId).first();if(!file)throw new CheckoutError('not_found');const rows=await db.prepare('SELECT data FROM pdf_chunks WHERE file_id=? ORDER BY ordinal').bind(fileId).all();const bytes=new Uint8Array(file.bytes);let offset=0;for(const row of rows.results){const chunk=row.data instanceof ArrayBuffer?new Uint8Array(row.data):Uint8Array.from(row.data);if(offset+chunk.length>bytes.length)throw new CheckoutError('file_corrupt');bytes.set(chunk,offset);offset+=chunk.length;}if(offset!==bytes.length)throw new CheckoutError('file_corrupt');if(createHash('sha256').update(bytes).digest('hex')!==file.sha256)throw new CheckoutError('file_corrupt');return {file,bytes};}
