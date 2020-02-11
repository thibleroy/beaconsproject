import {kafkaClient,AuthMessage} from 'msconnector';
const kafka = require('kafka-node')
import {Message,ConsumerOptions} from "kafka-node";
import {ENV} from 'lib';
import {verify} from 'jsonwebtoken';
import {UserModel} from './User';
import {IUserDocument} from './document'
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer = new kafka.Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_auth,partitions:1}], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: AuthMessage  = JSON.parse(message.value.toString());
    switch (data.type) {
        case ('req'):
            switch (data.action) {
                case 'create':
                    try {
                        let user = new UserModel(data.value)
                        await user.save()
                        let token = await user.generateAuthToken()
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : token,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg 
                    } catch (error) {
                        data.status = 400
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg 
                    }
                    break;
                case 'login':
                    try {
                        let user = await UserModel.findByCredentials(data.value.email,data.value.password)
                        if (!user) {
                            throw new Error('Login failed! Check authentication credentials')
                        }
                        let token = await user.generateAuthToken()
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : token,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg 
                    } catch (error) {
                        data.status = 400
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg 
                    }
                    break;
                case 'read':
                    auth(data,function(user:IUserDocument,token:string){
                    data.status = 200
                    let msg = {
                            type : 'res',
                            value : user.convert(),
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                    //TODO : send kafka msg 
                    })
                    break;
                case 'logout':
                    auth(data,async function(user:IUserDocument,token:string){
                        try {
                            user.tokens.splice(0, user.tokens.length)
                            await user.save()
                            data.status = 200
                            let msg = {
                                type : 'res',
                                value : true,
                                action : data.action,
                                id : data.id,
                                status : data.status
                            }
                            //TODO : send kafka msg 
                        } catch (error) {
                            data.status = 500
                            let msg = {
                                type : 'res',
                                value : error,
                                action : data.action,
                                id : data.id,
                                status : data.status
                            }
                            //TODO : send kafka msg 
                        }
                    })
                    break;
                default: break;
            }
            break;
        default: break;
    }
});


async function auth(msg : any, next:any) {
    const token : string = msg.token
    const data : any = verify(token, ENV.jwt_key)
    try {
        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error('Not authorized to access this resource')
        }
        next(user,token)
    } catch (error) {
        let erorrmsg = {
            type : 'res',
            value : error,
            action : msg.action,
            id : msg.id,
            status : 401
        }
        //TODO : send kafka msg 
    }


}
