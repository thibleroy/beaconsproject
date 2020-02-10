import {ClientMessage,kafkaClient} from "msconnector";
import {Consumer, ConsumerOptions, Message} from "kafka-node";
import {ENV} from "lib";
import {IClient} from "lib";
import {ClientModel} from './Client'
import {IClientDocument} from './document';
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_client,partition:1}], consumerOptions);
authConsumer.on('message', async(message: Message) => {
    const data: ClientMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    let newClient = new ClientModel(data.value)
                    await newClient.save()
                    data.res.status(200)
                    let msg = {
                        type : 'res',
                        value : newClient.convert(),
                        action : data.action,
                        res : data.res,
                        req : data.req
                    }
                    //TODO : send kafka msg
                    break;

                case 'list':
                let clients : IClientDocument[] = await ClientModel.find({})
                 let value : IClient[] = []
                 let clientsProcessed = 0;
                 clients.forEach(client =>{
                    value.push(client.convert())
                    clientsProcessed ++
                    if(clientsProcessed == clients.length){
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : value,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg
                    }
                 })
                    break;

                case 'read':
                    try {
                        let clientRead = await ClientModel.findOne({_id:data.value.id_client})
                        if(!clientRead){
                            throw new Error("Ressource not found")
                        }
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : clientRead.convert(),
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg
        
                        } catch (error) {
                        data.res.status(404)
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
                case 'delete':
                    try {
                        let result = await ClientModel.deleteOne({_id:data.value.id_client})
                        if (result.deletedCount == 0){
                            throw new Error("Ressource not found")
                        }
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : data.value,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg
                        
                        } catch (error) {
                        data.res.status(404)
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                    }
                    break;
                case 'update':
                    try {
                        let update = {
                            name: data.value.name,
                            url:data.value.url,
                            img:data.value.img,
                            lat:data.value.lat,
                            lng:data.value.lng,
                            address:data.value.address,
                        }
                        let result = await ClientModel.updateOne({_id:data.value.id_client},update)
                        if (result.nModified == 0){
                            throw new Error("Ressource not found")
                        }
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : data.value,
                            action : data.action,
                            res : data.res,
                            req : data.req
                        }
                        //TODO : send kafka msg
                        
                        } catch (error) {
                        data.res.status(404)
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
                default: break;
            }
            break;

        default: break;

    }
});
