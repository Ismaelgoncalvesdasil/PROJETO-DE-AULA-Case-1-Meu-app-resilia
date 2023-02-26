import express from 'express';
import router from '../routes.js';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { createTables } from './Models/Cerate.js';;

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

createTables()

app.listen(3000, () => console.log('Server rodando em http://localhost:3000/filmes'));

https
  .createServer(
    {
      cert: fs.readFileSync('src/SSL/code.crt'),
      key: fs.readFileSync('src/SSL/code.key'),
    },
    app
  )
  .listen(3001, () => console.log('Server rodando em https://localhost:3001/filmes'));