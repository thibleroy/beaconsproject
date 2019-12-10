import express from 'express';
import * as bodyparser from 'body-parser';
export const app = express();
app.use(bodyparser.json());
require('./routes/index');

