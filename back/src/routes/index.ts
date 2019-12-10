import * as express from 'express';
import {Request} from "express";
import {Response} from "express";
import {timeLog} from "../functions/express.functions";
const def = express.Router();
def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc'});
});
module.exports = function (app: any) {
    app.use(timeLog);
    app.use('/', def);
    app.use('/beacon', require('./beacon.route').beaconRouter);
    app.use('/client', require('./client.route').clientRouter);
    app.use('/beacons', require('./beacons.route').beaconsRouter);
    app.use('/clients', require('./clients.route').clientsRouter);
};
