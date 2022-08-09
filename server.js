import express from 'express';
import {router, errHandle} from './routes/index.js';

const app = express();

app.use(router)
app.use(errHandle)


