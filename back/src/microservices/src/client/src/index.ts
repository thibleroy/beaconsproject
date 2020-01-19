import * as instances from "@src/microservices";
import {Consumer, ConsumerOptions, Message} from "@src/microservices/node_modules/kafka-node";
import {ENV} from "@src/env";
import {ClientMessage} from '../../IMessage';
import {IBeacon} from "../../../entities/interfaces";
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(instances.kafkaClient, ['' + ENV.kafka_topic_client], consumerOptions);
authConsumer.on('message', (message: Message) => {
    const data: ClientMessage  = JSON.parse(message.value.toString());

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
