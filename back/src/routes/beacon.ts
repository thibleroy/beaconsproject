import express, {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Beacon} from "../entities/beacon";
const r: Router = express.Router();
r.get('/beacons', (req: Request, res: Response) => {
    const collection: any = getCollection('beacons');
    /*collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, description: item.description}});
            res.json(items);
        }
    });*/
    res.json({hello: 'cc'});
});

r.get('/beacon/:id', (req: Request, res: Response) => {
    const collection: any = getCollection('beacons');
    console.log(req.baseUrl);
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

r.post('/beacons',(req: Request, res: Response) => {
   // const b: Beacon = req.body;
    res.json({beacon_id: 'test'});
});

r.delete('/beacon:id', (req: Request, res: Response) => {

});
exports.router = r;
