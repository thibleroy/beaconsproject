import {kafkaClient} from 'msconnector';
import {Consumer, ConsumerOptions, Message} from 'msconnector/node_modules/kafka-node';
import {ENV} from 'lib';
import {AuthMessage} from 'msconnector/IMessage';
import {verify} from 'jsonwebtoken';
import {UserModel} from './User';
import {IUserDocument} from './document'
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_auth], consumerOptions);
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
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : token,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg 
                    } catch (error) {
                        data.res.status(400)
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            res : data.res,
                            req : data.req
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
                        let msg = {
                            type : 'res',
                            value : token,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg 
                    } catch (error) {
                        data.res.status(400)
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg 
                    }
                    break;
                case 'read':
                    auth(data.res,data.req,function(user:IUserDocument,token:string){
                    let msg = {
                            type : 'res',
                            value : user.convert(),
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                    //TODO : send kafka msg 
                    })
                    break;
                case 'logout':
                    auth(data.res,data.req,async function(user:IUserDocument,token:string){
                        try {
                            user.tokens.splice(0, user.tokens.length)
                            await user.save()
                            let msg = {
                                type : 'res',
                                value : true,
                                action : data.action,
                                res : data.res,
                                req : data.req
                            }
                            //TODO : send kafka msg 
                        } catch (error) {
                            data.res.status(500)
                            let msg = {
                                type : 'res',
                                value : error,
                                action : data.action,
                                res : data.res,
                                req : data.req
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


async function auth(res: any, req : any, next:any) {
    const token : string = req.header('Authorization').replace('Bearer ', '')
    const data : any = verify(token, ENV.jwt_key)
    try {
        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error('Not authorized to access this resource')
        }
        next(user,token)
    } catch (error) {
        res.status(401)
        let msg = {
            type : 'res',
            value : error,
            action : data.action,
            res : data.res,
            req : data.req
        }
        //TODO : send kafka msg 
    }


}
