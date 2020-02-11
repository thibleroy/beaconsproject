import {ClientMessage,kafkaClient} from "msconnector";
const kafka = require('kafka-node')
import {Message,ConsumerOptions} from "kafka-node";
import {ENV} from "lib";
import {IClient} from "lib";
import {ClientModel} from './Client'
import {IClientDocument} from './document';
const consumerOptions : ConsumerOptions = {fromOffset: false};
const authConsumer = new kafka.Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_client,partitions:1}], consumerOptions);
authConsumer.on('message', async(message: Message) => {
    const data : ClientMessage  = JSON.parse(JSON.stringify(message.value))

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    let newClient = new ClientModel(data.value)
                    await newClient.save()
                    data.status = 200
                    let msg = {
                        type : 'res',
                        value : newClient.convert(),
                        action : data.action,
                        id : data.id,
                        status : data.status
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
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : value,
                            action : data.action,
                            id : data.id,
                            status : data.status
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
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : clientRead.convert(),
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg
        
                        } catch (error) {
                        data.status = 404
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
                case 'delete':
                    try {
                        let result = await ClientModel.deleteOne({_id:data.value.id_client})
                        if (result.deletedCount == 0){
                            throw new Error("Ressource not found")
                        }
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : data.value,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg
                        
                        } catch (error) {
                        data.status = 404
                        let msg = {
                            type : 'res',
                            value : error,
                            action : data.action,
                            id : data.id,
                            status : data.status
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
                        data.status = 200
                        let msg = {
                            type : 'res',
                            value : data.value,
                            action : data.action,
                            id : data.id,
                            status : data.status
                        }
                        //TODO : send kafka msg
                        
                        } catch (error) {
                        data.status = 404
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
                default: break;
            }
            break;

        default: break;

    }
});
