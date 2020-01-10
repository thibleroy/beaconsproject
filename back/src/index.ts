import 'module-alias/register';
import {InitiateMongoServer} from '@helpers/mongo.helper';
import {app} from "@helpers/express.helper";
import * as http from 'http';
import {ENV} from "./env";
const server = http.createServer(app);
server.listen(ENV.api_port);
server.on('listening', async () => {
        await InitiateMongoServer(`mongodb://${ENV.db_url}:${ENV.db_port}/${ENV.db_name}`);
});



