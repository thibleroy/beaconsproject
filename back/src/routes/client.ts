import express, {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
const r: Router = express.Router();
r.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
r.get('/client/:id', (req: Request, res: Response) => {
    const collection: any = getCollection('clients');
    collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, description: item.description}});
            res.json(items);
        }
    });
});

r.get('clients', (req: Request, res: Response) => {
    const collection: any = getCollection('clients');
    collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, description: item.description}});
            res.json(items);
        }
    });
});
exports.clientRouter = r;
