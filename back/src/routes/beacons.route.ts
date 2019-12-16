import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "@functions/mongo.functions";
import {Beacon} from "@entities/interfaces";
import {messages} from '@constants/wording';
import {Collection, MongoError, UpdateWriteOpResult} from "mongodb";
const router: Router = express.Router();
router.get('/', (req: Request, res: Response) => {
    const collection: any = getCollection('beacons');
    collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, name: item.name}});
            res.json({status: true, beacons: items});
        }
    });

});

router.post('/',(req: Request, res: Response) => {
    const collection: Collection = getCollection('beacons');
    //console.log('tesst', req.body);
    const currentBeacon: Beacon = {uuid: req.body.uuid,minor: req.body.minor,major: req.body.major,id_client: req.body.id_client,name: req.body.name};
    collection.updateOne({uuid: req.body.uuid, major: req.body.major, minor: req.body.minor}, {$set: {...currentBeacon}},{ upsert: true }, ((error: MongoError, result1: UpdateWriteOpResult) => {
        if (result1.matchedCount === 0) {
            collection.updateOne({uuid: req.body.uuid, major: req.body.major, minor: req.body.minor}, {$set:{id: result1.upsertedId._id.toHexString()}}, ((error: MongoError, result2: UpdateWriteOpResult) => {
                res.json({status: true, id: result1.upsertedId._id});
            }));
       } else {
           res.json({status: false, reason: messages.beacon_existing});
       }
    }));
});

exports.beaconsRouter = router;
