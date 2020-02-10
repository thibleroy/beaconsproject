import {kafkaClient} from "msconnector";
import {Consumer, ConsumerOptions, Message} from "kafka-node";
import {ENV} from "lib";
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_logger,partition:1}], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: any  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    break;

                case 'delete':

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
