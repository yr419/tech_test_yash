import express from 'express';
import cors from 'cors';
import { initDb } from './db/init';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

async function start() {
  await initDb();

  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
}

start();