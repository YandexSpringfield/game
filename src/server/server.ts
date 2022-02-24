import express from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectToDB } from '@server/db/client';
import https from 'https';
import clientConfig from '../../webpack/client.config';
import { IS_DEV } from '../../webpack/env';
import {
  authMiddleware,
  renderMiddleware,
  storeMiddleware,
  webpackMiddleware,
} from '.';

dotenv.config();
const app = express();
const port = process.env.PORT || 80;

console.log('port from process env', process.env.PORT);
console.log('env node ', process.env.NODE_ENV);

app.use(cookieParser());
app.use(
  express.static(path.resolve(__dirname, '../dist'), {
    maxAge: '1d',
  }),
);
app.get(
  '/*',
  [...webpackMiddleware(clientConfig)],
  authMiddleware,
  storeMiddleware,
  renderMiddleware,
);

const startApp = () => {
  connectToDB().then(() => {
    if (IS_DEV) {
      const pem = readFileSync(
        path.resolve(__dirname, '../certificates/cert.pem'),
        'utf-8',
      );

      const key = readFileSync(
        path.resolve(__dirname, '../certificates/key.pem'),
        'utf-8',
      );

      const server = https.createServer(
        {
          key,
          cert: pem,
        },
        app,
      );
      server.listen(port, () => {
        console.log('Application is started on localhost:', port);
      });
    } else {
      app.listen(port, () => {
        console.log('Application is started on localhost:', port);
      });
    }
  });
};

export default startApp;
