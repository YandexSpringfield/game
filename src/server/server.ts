import 'dotenv/config';
import express from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';

import { connectToDBClient } from '@server/db/client';
import https from 'https';
import clientConfig from '../../webpack/client.config';
import { IS_DEV } from '../../webpack/env';
import {
  authMiddleware,
  renderMiddleware,
  storeMiddleware,
  webpackClientMiddleware,
} from '.';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get(
  '/*',
  [...webpackClientMiddleware(clientConfig)],
  authMiddleware,
  storeMiddleware,
  renderMiddleware,
);

const startApp = async () => {
  await connectToDBClient();

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
};

startApp();
