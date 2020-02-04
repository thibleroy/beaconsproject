import * as express from 'express';
import {Request, Response} from "express";
const def = express.Router();
def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});
module.exports = function (app: any) {
    app.use((req: Request, res: Response, next: any) => {
        console.log(`${res.statusCode} ${req.method} ${req.originalUrl} | ${req.headers["user-agent"]}`);
        next();
    });
    app.use('/', def);
    app.use('/clients', require('./route').clientsRouter);
};
