import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Collection} from "mongodb";
import {messages} from "../constants/wording";
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
        console.log('error', error);
        console.log('result', result)
        if (result.deletedCount === 1) {
            res.json({status: true, id: id});
        } else {
            res.json({status: false, reason: messages.beacon_not_existing});
        }
    }))

});

exports.beaconRouter = router;
