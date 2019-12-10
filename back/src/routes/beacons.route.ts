import express, {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Beacon} from "../../src/entities/interfaces";
import {timeLog} from "../functions/express.functions";
import {Collection} from "mongodb";
const router: Router = express.Router();
router.use(timeLog);
router.get('/', (req: Request, res: Response) => {
    /*const collection: any = getCollection('beacons');
    collection.find({}).toArray((err: any, items: any) => {
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

router.post('/',(req: Request, res: Response) => {
    const collection: Collection = getCollection('beacons');
    //console.log('tesst', req.body);
    const currentBeacon: Beacon = {uuid: req.body.uuid,minor: req.body.minor,major: req.body.major,id_client: req.body.id_client,name: req.body.name};
    console.log('cb', currentBeacon);
    collection.insertOne(currentBeacon).then(() => {

    });
    res.json({beacon_id: 'test'});
});

exports.beaconsRouter = router;
