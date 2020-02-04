//import * as instances from "msconnector";
import {kafkaClient} from 'msconnector';
import { Consumer, ConsumerOptions, Message } from "msconnector/node_modules/kafka-node";
import { ENV } from "lib";
import { BeaconMessage } from 'msconnector/IMessage';
import { IBeacon } from "lib";
import { BeaconModel } from "@src/beacon/src/Beacon";
import mongoose from 'mongoose';
const consumerOptions: ConsumerOptions = { fromOffset: false };


const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_beacon], consumerOptions);

authConsumer.on('message', async (message: Message) => {
    const data: BeaconMessage = JSON.parse(message.value.toString());
    
    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'list':
                    BeaconModel.find({ id_client: data.value.id_client }, function (err: any, docs: IBeacon[]) {
                        sendKafkaResponse(docs, 'list')
                    });
                    break;

                case 'create':
                    let beacon = new BeaconModel(data.value);

                    beacon.save( {}, (err: any, product: any) => {
                        if (err) return console.error(err);
                        console.log(" saved to bookstore collection.");
                    });
                    sendKafkaResponse('', 'create')
                    break;
<<<<<<< HEAD

                case 'get':
                    BeaconModel.find({ id_client: data.value.id_client, id_beacon: data.value }, function (err: any, docs: IBeacon) {
                        sendKafkaResponse(docs, 'get')
                    });
=======
                case 'list':

                    break;
                case 'read':
>>>>>>> dev
                    break;

                case 'delete':
                    BeaconModel.deleteOne({ id_client: data.value.id_client}, function (err: any) {

                    });
                    sendKafkaResponse('', 'delete')
                    break;

                case 'update':
                    break;
                default: break;
            }
            break;

        default: break;

    }
});

function sendKafkaResponse(val: any, actionVal : String) {
    const messageValue: BeaconMessage = { type: "res", action: '' + actionVal, value: val };

    instances.apiProducer.send([{ topic: '' + ENV.kafka_topic_beacon, messages: messageValue }], (err: Error, data: any) => {
        console.log('send producer clients - get all beacons-', data);
    });
}

