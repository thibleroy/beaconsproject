import {router} from "../express.helper";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";

router.get('/client/:id', (req: Request, res: Response) => {
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

router.get('clients', (req: Request, res: Response) => {
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
