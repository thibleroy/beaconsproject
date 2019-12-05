import {router} from "../express.helper";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Beacon} from "../entities/beacon";
router.get('/beacons', (req: Request, res: Response) => {
    const collection: any = getCollection('beacons');
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

router.get('/beacon/:id', (req: Request, res: Response) => {
    const collection: any = getCollection('beacons');
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

router.post('/beacons',(req: Request, res: Response) => {
    const b: Beacon = req.body;
    res.json({beacon_id: 'test'});
});

router.delete('/beacon:id', (req: Request, res: Response) => {

});
