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
                    try {
                        let create_user = new UserModel(data.value)
                        await create_user.save()
                        let create_token = await create_user.generateAuthToken()
                        let create_msg = {
                            type : 'res',
                            value : create_token,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg 
                    } catch (error) {
                        //data.res.status()
                    }

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
