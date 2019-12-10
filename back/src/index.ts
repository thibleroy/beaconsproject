import {MongoHelper} from './mongo.helper.js';
import http from 'http';
import {app} from "./express.helper";
export const port = 3000;
app.use(function (req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
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


