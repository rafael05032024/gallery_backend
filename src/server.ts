import express from 'express';

const server = express();

server.get('/status', (req, res) => {
  return res.send({ ok: true });
});

server.listen(3200, '0.0.0.0', () => {
  console.log('App up and running on port 3200');
});