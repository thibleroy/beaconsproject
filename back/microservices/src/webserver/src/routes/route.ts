import * as express from "express";
import { Router } from "express";
import { Request, Response } from "express";
import { BeaconMessage, ClientMessage } from "msconnector/IMessage";
import {kafkaClient } from 'msconnector';
import { sendKafkaMessage } from 'msconnector/utils/kafka';
import { ENV } from "lib";
import { IBeacon } from "lib";
import { IClient } from "lib";
import { Message, Producer } from "msconnector/node_modules/kafka-node";
const router: Router = express.Router();

const producer: Producer = new Producer(kafkaClient, { requireAcks: 1 })

//Routes Clients

router.get('/', async (request: Request, response: Response) => {
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);

});

router.post('/', async (request: Request, response: Response) => {
    const currentClient: IClient = request.body;
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentClient , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);

});

router.get('/:clientId', async (request: Request, response: Response) => {
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: { id_client: request.params.clientId } , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

router.delete('/:clientId', async (request: Request, response: Response) => {
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

router.put('/:clientId', async (request: Request, response: Response) => {
    const currentClient: IClient = request.body;
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentClient, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

//Routes Beacons

router.get('/:clientId/beacons', async (request: Request, response: Response) => {
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, value: { id_client: request.params.clientId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.post('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    const currentBeacon: IBeacon = request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentBeacon , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.get('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: {id_client : request.params.clientId, id_beacon : request.params.beaconId}, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.delete('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.put('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    const currentClient: IClient = request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentClient , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

//Routes content

/*router.post('/clients/:clientId/beacons/:beaconId/contents', async (request: Request, response: Response) => {
    const currentClient:  = request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: { id_client: request.params.clientId, id_beacon: request.params.clientId } , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});
*/
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



