import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Collection, MongoError, UpdateWriteOpResult} from "mongodb";
import {messages} from "../constants/wording";
import {Beacon} from "../entities/interfaces";
const router: Router = express.Router();


router.get('/:id', (req: Request, res: Response) => {
    const collection: Collection = getCollection('beacons');
    const id = req.url.split('/')[1];
    collection.find({id: id}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, client_id: item.client_id, uuid: item.uuid, major: item.major, minor: item.minor, name: item.name}});
            res.json({status: true, beacon: items[0]});
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    const collection: Collection = getCollection('beacons');
    console.log(req.url);
    const id = req.url.split('/')[1];
    console.log('id', id);
    collection.deleteOne({id: id}, ((error, result) => {
        if (result.deletedCount === 1) {
            res.json({status: true, id: id});
        } else {
            res.json({status: false, reason: messages.beacon_not_existing});
        }
    }))

});

router.post('/:id', (req: Request, res: Response) => {
    const collection: Collection = getCollection('beacons');
    const currentBeacon: Beacon = {id: req.url.split('/')[1],uuid: req.body.uuid,minor: req.body.minor,major: req.body.major,id_client: req.body.id_client,name: req.body.name};
    collection.updateOne({id: req.url.split('/')[1]}, {$set: {...currentBeacon}},{ upsert: false }, ((error: MongoError, result1: UpdateWriteOpResult) => {
        if (result1.modifiedCount === 1) {
            res.json({status: true, id: currentBeacon.id});
        } else {
            res.json({status: false, reason: messages.beacon_existing});
        }
    }));
});

exports.beaconRouter = router;
