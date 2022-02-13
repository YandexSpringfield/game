import express from 'express';
import path from 'path';
import serverRenderMiddleware from './server-render-middleware';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/*', serverRenderMiddleware);

export { app };
