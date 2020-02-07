import {app} from "./express.helper";
import * as http from 'http';
import {ENV} from "lib";
import {Router,Request, Response} from "express";
import {MainRouter} from './routes/route';

const def = Router();

def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});

app.use('/clients',MainRouter)
app.use('/hello',def)


const server = http.createServer(app);
server.listen(ENV.api_port);