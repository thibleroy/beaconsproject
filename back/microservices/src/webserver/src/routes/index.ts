import * as express from 'express';
import {Request, Response} from "express";
import {MyLogger} from "@src/microservices/logger/src/logger.helper";
const def = express.Router();
def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});
module.exports = function (app: any) {
    const logger = new MyLogger('info');
    app.use((req: Request, res: Response, next: any) => {
        console.log(`${res.statusCode} ${req.method} ${req.originalUrl} | ${req.headers["user-agent"]}`);
        logger.infoLog({time: Date.now()});
        next();
    });
    app.use('/', def);
    app.use('/clients', require('./route').clientsRouter);
};
