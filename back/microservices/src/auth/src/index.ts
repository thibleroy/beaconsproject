import {kafkaClient} from 'msconnector';
import {Consumer, ConsumerOptions, Message} from 'msconnector/node_modules/kafka-node';
import {ENV} from 'lib';
import {AuthMessage} from 'msconnector/IMessage';
import {IUser} from 'lib';
import {UserModel} from './User'
const jwt = require('jsonwebtoken');
const JWT_KEY = 'blabla'

const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_auth], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: AuthMessage  = JSON.parse(message.value.toString());

    switch (data.type) {
        case ('req'):

            switch (data.action) {
                case 'create':
                try {
                    const user = new UserModel(data.value)
                    await user.save()
                    const token = await user.generateAuthToken()
                    data.res.send({ value : token })
                } 
                catch (error) {
                    data.res.status(400).send(error)
                }
                    break;

                case 'login':
                try {
                    let email  = data.value.body
                    let password = data.value.password
                    const user = await UserModel.findByCredentials(email, password)
                    if (!user) {
                        return data.res.status(401).send({error: 'Login failed! Check authentication credentials'})
                    }
                    const token = await user.generateAuthToken()
                    data.res.send({ value : token })
                } catch (error) {
                    data.res.status(400).send(error)
                }

                    break;

                case 'read':
                    let user_login = await auth(data.token,data.res)
                    data.res.send({ value : user_login })
                    break;

                case 'logout':
                    //TODO
                        break;
                
                default: break;
            }
            break;

        default: break;

    }
});

async function auth (token:string,res:any) : IUser {
    // Generate an auth token for the user
    const data = jwt.verify(token, JWT_KEY)
    try {
        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        return user
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
