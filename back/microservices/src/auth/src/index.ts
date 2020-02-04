import {kafkaClient} from 'msconnector';
import {Consumer, ConsumerOptions, Message} from 'msconnector/node_modules/kafka-node';
import {ENV} from 'lib';
import {AuthMessage} from 'msconnector/IMessage';
import {IUser} from 'lib';
import {UserModel} from './User'
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_auth], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: AuthMessage  = JSON.parse(message.value.toString());
    switch (data.type) {
        case ('req'):
            switch (data.action) {
                case 'create':

                    break;
                case 'login':

                    break;
                case 'read':

                    break;
                case 'logout':

                    break;
                default: break;
            }
            break;
        default: break;
    }
});
