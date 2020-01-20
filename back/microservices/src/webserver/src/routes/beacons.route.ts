import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {IBeacon} from "@entities/interfaces";
import {messages} from '@constants/wording';
import {BeaconModel} from "@src/db/Beacon";
import {MongooseDocument} from "mongoose";

const router: Router = express.Router();
router.get('/', async (req: Request, res: Response) => {
    try {
        let beacons = await BeaconModel.find({});
        console.log('beacons', beacons);
        res.json({status: true, beacons: beacons});

    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});

router.post('/',async (req: Request, res: Response) => {
    try {
        const currentBeacon: IBeacon = {id_client: req.body.id_client, name: req.body.name,
            uuid: req.body.uuid, minor: req.body.minor, major: req.body.major};
        //BeaconModel.findOne(currentBeacon) === undefined ? :)
        await BeaconModel.create(currentBeacon, async (err: Error, doc: any) => {
            if (err) console.error(err);
            else {
                doc.id_beacon = doc._id;
                doc.save();
                res.json({status: true, beacon: doc});
            }
        });
    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});

exports.beaconsRouter = router;
