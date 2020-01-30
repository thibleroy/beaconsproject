import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {BeaconMessage} from "msconnector/IMessage";
import {ENV} from "lib";
import * as instances from '../../api_connector.js';
const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    const beaconMsg: BeaconMessage = {type: 'req', action: 'get', value: {id_beacon: req.url.split('/')[1]}}
    instances.apiProducer.send([{topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg}], (err: Error, data: any) => {
        console.log('send producer beacons', data);
    });
});


router.delete('/:id', async (req: Request, res: Response) => {

});

router.put('/:id', async (req: Request, res: Response) => {

});

exports.beaconRouter = router;
