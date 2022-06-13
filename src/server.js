import { createServer } from 'http';
import { once }         from 'events';
import { randomUUID }   from 'crypto';

const db = new Map();

function resJSON(data, res){
  return res.end(JSON.stringify(data));
}

async function handler(req, res){
  const { method } = req;

  if((/get/i).test(method)){
    return resJSON([...db.values()], res);
  }

  if((/post/i).test(method)){
    const body = JSON.parse(await once(req, 'data'));
    const id   = randomUUID();

    db.set(id, body);

    return resJSON({ ok: 1 }, res);
  }

  if((/delete/i).test(method)){
    db.clear();
    return resJSON({ ok: 1 }, res);
  }

  if((/put/i).test(method)){
    return resJSON({ ok: 1 }, res);
  }
}

export default createServer(handler);

