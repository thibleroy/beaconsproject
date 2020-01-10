import * as express from 'express';
import {Request, Response} from "express";
import {MyLogger} from "@helpers/logger.helper";
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
    app.use('/beacon', require('./beacon.route').beaconRouter);
    app.use('/client', require('./client.route').clientRouter);
    app.use('/beacons', require('./beacons.route').beaconsRouter);
    app.use('/clients', require('./clients.route').clientsRouter);
    app.use('/user', require('./user.route').userRouter);
};
