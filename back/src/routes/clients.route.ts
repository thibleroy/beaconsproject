import express, {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Client} from "../../src/entities/interfaces";
import {messages} from '../constants/wording';
import {Collection, MongoError, UpdateWriteOpResult} from "mongodb";
const router: Router = express.Router();
router.get('/', (req: Request, res: Response) => {
    const collection: any = getCollection('clients');
    collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, name: item.name}});
            console.log('items', items);
            res.json({status: true, clients: items});
        }
    });

});

router.post('/',(req: Request, res: Response) => {
    const collection: Collection = getCollection('clients');
    //console.log('tesst', req.body);
    const currentClient: Client = {name: req.body.name};
    collection.updateOne({name: req.body.name}, {$set: {...currentClient}},{ upsert: true }, ((error: MongoError, result1: UpdateWriteOpResult) => {
        console.log('count', result1.matchedCount);
        if (result1.matchedCount === 0) {
            collection.updateOne({name: req.body.name}, {$set:{id: result1.upsertedId._id.toHexString()}}, ((error: MongoError, result2: UpdateWriteOpResult) => {
                res.json({status: true, client_id: result1.upsertedId._id});
            }));
        } else {
            res.json({status: false, reason: messages.client_existing});
        }
    }));
});

exports.clientsRouter = router;
