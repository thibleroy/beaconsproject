import * as express from 'express';
import {Request} from "express";
import {Response} from "express";
import {timeLog} from "../functions/express.functions";
const def = express.Router();
def.use(timeLog);
def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc'});
});
module.exports = function (app: any) {
    app.use('/', def);
    app.use('/beacons', require('./beacon').beaconRouter);
    app.use('/clients', require('./client').clientRouter);
};
