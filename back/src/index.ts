import {MongoHelper} from './mongo.helper';
import http from 'http';
import express from 'express';
import * as bodyparser from 'body-parser';
export const app = express();
require('./routes/index')(app);
app.use(function (req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyparser.json());
export const port = 3000;
const server = http.createServer(app);
server.listen(port);
server.on('listening', async () => {
    try {
        await MongoHelper.connect(`mongodb://localhost:27017/`);
        console.info(`Connected to Mongo!`);
    } catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});


