import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {IBeacon} from "@entities/interfaces";
import * as instances from '../api_connector';
import {BeaconMessage} from "@src/microservices/IMessage";
import {ENV} from "@src/env";
const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    const beaconMsg: BeaconMessage = {type: 'req', action: 'get', value: {id_beacon: req.url.split('/')[1]}}
    instances.apiProducer.send([{topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg}], (err, data) => {
        console.log('send producer beacons', data);
    });
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
