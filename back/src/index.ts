import {MongoHelper} from './mongo.helper.js';
import http from 'http';
import {app} from "./express.helper";
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


