import 'dotenv/config';
import express from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';

import { connectToDBClient } from '@server/db/client';
import https from 'https';
import {
  userThemeRoute,
  topicRoute,
  authRoute,
  leaderboardRoute,
  userRoute,
} from '@server/controllers';
import clientConfig from '../../webpack/client.config';
import { IS_DEV } from '../../webpack/env';
import {
  authMiddleware,
  renderMiddleware,
  storeMiddleware,
  privateMiddleware,
  webpackClientMiddleware,
  cspMiddleware,
  resourcesMiddleware,
} from '.';

const app = express();
const port = process.env.PORT || 3000;

app.use(cspMiddleware());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/v1/theme', [privateMiddleware, userThemeRoute]);
app.use('/api/v1/topics', [privateMiddleware, topicRoute]);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/leaderboard', [privateMiddleware, leaderboardRoute]);
app.use('/api/v1/resources', resourcesMiddleware);
app.use('/api/v1/user', [privateMiddleware, userRoute]);

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
