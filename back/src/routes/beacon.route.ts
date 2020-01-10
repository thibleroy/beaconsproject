import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {BeaconModel} from '@src/db/Beacon';
import {messages} from "@constants/wording";
import {IBeacon} from "@entities/interfaces";
const router: Router = express.Router();


router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.url.split('/')[1];
        const existingBeacon = await BeaconModel.findById(id);
        console.log('existing', existingBeacon);
        res.json(existingBeacon);
    } catch (err){
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});



router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.url.split('/')[1];
        await BeaconModel.findByIdAndRemove(id);
        res.json({status: true})
    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});

router.put('/:id', async (req: Request, res: Response) => {

    const currentBeacon: IBeacon = {uuid: req.body.uuid,minor: req.body.minor,major: req.body.major,id_client: req.body.id_client,name: req.body.name};
    try {
        const id = req.url.split('/')[1];
        await BeaconModel.findByIdAndUpdate(id, currentBeacon);
        res.json({status: true})
    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});

exports.beaconRouter = router;
