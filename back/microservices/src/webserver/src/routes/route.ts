import { Router, Request, Response } from "express";
import {kafkaClient ,sendKafkaMessage,ResourceMessage, BeaconMessage, ClientMessage, ContentMessage, AuthMessage } from "msconnector";
import { ENV } from "lib";
import { IBeacon, IClient, IContent, IUser } from "lib";
import {Producer } from "kafka-node";

     
const router: Router = Router();


const producer: Producer = new Producer(kafkaClient, { requireAcks: 1 })

//Routes Clients

router.get('/', async (request: Request, response: Response) => {
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, req: request, res: response, value:undefined};

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
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId, id_beacon :request.params.beaconId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.put('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    const currentBeacon: IBeacon= request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentBeacon , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

//Routes content

router.get('/:clientId/beacons/:beaconId/contents', async (request: Request, response: Response) => {
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, value: { id_client: request.params.clientId, id_beacon : request.params.beaconId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.post('/:clientId/beacons/:beaconId/contents', async (request: Request, response: Response) => {
    const currentBeacon: IContent = request.body;
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentBeacon , req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.get('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: {id_client : request.params.clientId, id_beacon : request.params.beaconId, id_content :request.params.contentId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.delete('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId, id_beacon : request.params.beaconId, id_content :request.params.contentId }, req: request, res: response };

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.put('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    const currentContent: IContent = request.body;
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentContent, req: request, res: response};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});


export const MainRouter = router;



