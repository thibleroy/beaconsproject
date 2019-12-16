import 'module-alias/register';
import {MongoHelper} from '@helpers/mongo.helper';
import {app} from "@helpers/express.helper";
import * as http from 'http';
import {ENV} from "./env";
const server = http.createServer(app);
server.listen(ENV.api_port);
server.on('listening', async () => {
    try {
        await MongoHelper.connect(`mongodb://${ENV.db_url}:${ENV.db_port}/${ENV.db_name}`);
        console.info(`Connected to Mongo`);
    } catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});



