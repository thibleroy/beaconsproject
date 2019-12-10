import {MongoHelper} from './helpers/mongo.helper';
import {app} from "./helpers/express.helper";
import http from 'http';
export const port = 3000;
const server = http.createServer(app);
server.listen(port);
server.on('listening', async () => {
    try {
        await MongoHelper.connect(`mongodb://localhost:27017/activiot`);
        console.info(`Connected to Mongo`);
    } catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});


