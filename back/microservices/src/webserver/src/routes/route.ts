import { Router, Request, Response } from "express";
import {kafkaClient ,sendKafkaMessage,ResourceMessage, BeaconMessage, ClientMessage, ContentMessage, AuthMessage } from "msconnector";
import { ENV } from "lib";
import { IBeacon, IClient, IContent, IUser } from "lib";
import {Producer,ConsumerOptions, Message } from "kafka-node";
const kafka = require('kafka-node')
import * as uniqid from 'uniqid'

     
const router: Router = Router();

export var map : any = {}


const producer: Producer = new Producer(kafkaClient, { requireAcks: 1 })

//Routes Clients

router.get('/', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, value:undefined, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);

});

router.post('/', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentClient: IClient = request.body;
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentClient , id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);

});

router.get('/:clientId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: { id_client: request.params.clientId } , id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

router.delete('/:clientId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

router.put('/:clientId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentClient: IClient = request.body;
    const ClientMsg: ClientMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentClient, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_client, ClientMsg);
});

//Routes Beacons

router.get('/:clientId/beacons', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, value: { id_client: request.params.clientId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.post('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentBeacon: IBeacon = request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentBeacon , id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.get('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: {id_client : request.params.clientId, id_beacon : request.params.beaconId}, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.delete('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId, id_beacon :request.params.beaconId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

router.put('/:clientId/beacons/:beaconId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentBeacon: IBeacon= request.body;
    const beaconMsg: BeaconMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentBeacon , id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_beacon, beaconMsg);
});

//Routes content

router.get('/:clientId/beacons/:beaconId/contents', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_list, value: { id_client: request.params.clientId, id_beacon : request.params.beaconId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.post('/:clientId/beacons/:beaconId/contents', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentBeacon: IContent = request.body;
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_create, value: currentBeacon , id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.get('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_get, value: {id_client : request.params.clientId, id_beacon : request.params.beaconId, id_content :request.params.contentId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.delete('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_delete, value: { id_client: request.params.clientId, id_beacon : request.params.beaconId, id_content :request.params.contentId }, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});

router.put('/:clientId/beacons/:beaconId/contents/:contentId', async (request: Request, response: Response) => {
    let id : string = uniqid.default()
    map[id] = response
    const currentContent: IContent = request.body;
    const contentMsg: ContentMessage = { type: ENV.kafka_request, action: ENV.kafka_action_update, value: currentContent, id:id, status:0};

    sendKafkaMessage(producer, ENV.kafka_topic_content, contentMsg);
});


const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer = new kafka.Consumer(kafkaClient, 
    [
        { topic:'' + ENV.kafka_topic_auth, partitions:1},
        { topic:'' + ENV.kafka_topic_beacon,partitions:1},
        { topic:'' + ENV.kafka_topic_client,partitions:1},
        { topic:'' + ENV.kafka_topic_content,partitions:1},
    ], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: ResourceMessage  = JSON.parse(JSON.stringify(message.value));
    switch (data.type) {
        case ('res'):
            //data.res.send({value:data.value})
            break;
        default: break;
    }
})

export const MainRouter = router;



