import * as instances from "msconnector";
import {Consumer, ConsumerOptions, Message} from "msconnector/node_modules/kafka-node";
import {ENV} from "lib";
import {ContentMessage} from "msconnector/IMessage";
import {IBeacon} from "lib";
import {ContentModel} from './Content'
import {IContentDocument} from './document'
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(instances.kafkaClient, ['' + ENV.kafka_topic_content], consumerOptions);
authConsumer.on('message', (message: Message) => {
    const data: ContentMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':

                    break;

                case 'delete':

                    break;

                case 'list':

                    break;
                case 'read':

                    break;
                case 'update':

                    break;
                default: break;
            }
            break;

        default: break;

    }
});
