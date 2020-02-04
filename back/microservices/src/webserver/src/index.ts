import 'module-alias/register';
import {app} from "express.helper";
import * as http from 'http';
import {ENV} from "lib";
const server = http.createServer(app);
server.listen(ENV.api_port);