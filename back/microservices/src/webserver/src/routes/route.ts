import * as express from "express";
import { Router } from "express";
import { Request, Response } from "express";
import { BeaconMessage, ClientMessage } from "msconnector/IMessage";
import * as instances from '../../api_connector.js';
import { ENV } from "lib";
import { IBeacon } from "lib";
import { IClient } from "lib";
import { Message } from "msconnector/node_modules/kafka-node";

const router: Router = express.Router();

var response: Response;

//Routes Clients

router.get('/', async (req: Request, res: Response) => {
    const ClientMsg: ClientMessage = { type: 'req', action: 'list' };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_client, messages: '' }], (err: Error, data: any) => {
        console.log('send producer clients - get all clients-', data);
        response = res;
    });
});

router.post('/', async (req: Request, res: Response) => {
    const currentClient: IClient = req.body;
    const ClientMsg: ClientMessage = { type: 'req', action: 'create', value: currentClient };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_client, messages: ClientMsg }], (err: Error, data: any) => {
        console.log('send producer clients - create a client-', data);
        response = res;
    });
});

router.get('/:clientId', async (req: Request, res: Response) => {
    const ClientMsg: ClientMessage = { type: 'req', action: 'get', value: { id_client: req.params.clientId } };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_client, messages: ClientMsg }], (err: Error, data: any) => {
        console.log('send producer clients - get a client -', data);
        response = res;
    });
});

router.delete('/:clientId', async (req: Request, res: Response) => {
    const ClientMsg: ClientMessage = { type: 'req', action: 'delete', value: { id_client: req.params.clientId } };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_client, messages: ClientMsg }], (err: Error, data: any) => {
        console.log('send producer clients - delete a client -', data);
        response = res;
    });
});

router.put('/:clientId', async (req: Request, res: Response) => {
    const currentClient: IClient = req.body;
    const ClientMsg: ClientMessage = { type: 'req', action: 'update', value: currentClient };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_client, messages: ClientMsg }], (err: Error, data: any) => {
        console.log('send producer clients - delete a client -', data);
        response = res;
    });
});

//Routes Beacons

router.get('/:clientId/beacons', async (req: Request, res: Response) => {
    const beaconMsg: BeaconMessage = { type: 'req', action: 'list', value: { id_client: req.params.clientId } };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg }], (err: Error, data: any) => {
        console.log('send producer clients - get all beacons-', data);
        response = res;
    });
});

router.post('/:clientId/beacons/:beaconId', async (req: Request, res: Response) => {
    const currentBeacon: IBeacon = req.body;
    const beaconMsg: BeaconMessage = { type: 'req', action: 'create', value: currentBeacon };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg }], (err: Error, data: any) => {
        console.log('send producer clients - create a beacon -', data);
        response = res;
    });
});

router.get('/:clientId/beacons/:beaconId', async (req: Request, res: Response) => {
    const beaconMsg: BeaconMessage = { type: 'req', action: 'get', value: {id_client : req.params.clientId, id_beacon : req.params.beaconId} };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg }], (err: Error, data: any) => {
        console.log('send producer clients - get a beacon -', data);
        response = res;
    });
});

router.delete('/:clientId/beacons/:beaconId', async (req: Request, res: Response) => {
    const beaconMsg: BeaconMessage = { type: 'req', action: 'delete', value: { id_client: req.params.clientId } };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg }], (err: Error, data: any) => {
        console.log('send producer clients - delete a beacon -', data);
        response = res;
    });
});

router.put('/:clientId/beacons/:beaconId', async (req: Request, res: Response) => {
    const currentClient: IClient = req.body;
    const beaconMsg: BeaconMessage = { type: 'req', action: 'update', value: currentClient };
    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: beaconMsg }], (err: Error, data: any) => {
        console.log('send producer clients - update a beacon -', data);
        response = res;
    });
});

/*instances.apiConsumer.on('message', async (message: Message) => {
    switch (JSON.parse(message.value.toString())) {
        case 'res':
            response.send(message.value.value) 
            break;
    
        default:
            break;
    }
});*/




exports.beaconsRouter = router;



