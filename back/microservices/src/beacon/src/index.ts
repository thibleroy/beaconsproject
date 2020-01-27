import * as instances from "msconnector";
import {Consumer, ConsumerOptions, Message} from "msconnector/node_modules/kafka-node";
import {ENV} from "lib";
import {BeaconMessage} from 'msconnector/IMessage';
import {IBeacon} from "lib";
import {BeaconModel} from "@src/beacon/src/Beacon";
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(instances.kafkaClient, ['' + ENV.kafka_topic_beacon], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: BeaconMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    const beacon: IBeacon = data.value;
                    break;

                case 'delete':

                    break;
                case 'get':
                    break;
                case 'update':

                    break;
                default: break;
            }
            break;

        default: break;

    }
});
