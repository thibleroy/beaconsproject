import {ClientMessage,kafkaClient,sendKafkaMessage, fetchLastOffsets} from "msconnector";
const kafka = require('kafka-node')
import {Producer,Message,ConsumerOptions} from "kafka-node";
import {ENV} from "lib";
import {IClient} from "lib";
import {ClientModel} from './Client'
import {IClientDocument} from './document';

const producer: Producer = new Producer(kafkaClient, { requireAcks: 1 })

const consumerOptions : ConsumerOptions = {fromOffset: false};
const authConsumer = new kafka.Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_client,partitions:1}], consumerOptions);
authConsumer.on('message', (message: Message) => {
    fetchLastOffsets(['' + ENV.kafka_topic_client]).then(() => {
        const data : ClientMessage  = JSON.parse(message.value.toString());
        console.log(data);
        switch (data.type) {

            case ('req'):

                switch (data.action) {

                    case 'create':
                        create(data).then(msg =>{
                            sendKafkaMessage(producer, ENV.kafka_topic_client, msg);
                        });
                        break;

                    case 'list':
                        list(data).then(msg =>{
                            sendKafkaMessage(producer, ENV.kafka_topic_client, msg);
                        });
                        break;

                    case 'read':
                        read(data).then(msg =>{
                            sendKafkaMessage(producer, ENV.kafka_topic_client, msg);
                        });
                        break;
                    case 'delete':
                        remove(data).then(msg =>{
                            sendKafkaMessage(producer, ENV.kafka_topic_client, msg);
                        });

                        break;
                    case 'update':
                        update(data).then(msg =>{
                            sendKafkaMessage(producer, ENV.kafka_topic_client, msg);
                        });
                        break;
                    default: break;
                }
                break;
            default: break;
        }
    });
});

const list = (data:ClientMessage): Promise<ClientMessage> =>{
    return new Promise((res) => {
        ClientModel.find(function(err, clients) {
            if(err){
                res({
                    type : 'res',
                    value : err.message,
                    action : data.action,
                    id : data.id,
                    status : 404
                })
            }else{
                let value : IClient[] = []
                for(let i = 0; i <= clients.length ; i++){
                    if(i == clients.length){
                        res({
                            type : 'res',
                            value : value,
                            action : data.action,
                            id : data.id,
                            status : 200
                        })
                    }else{
                        value.push(clients[i].convert())
                    }
                }
            }
        });
    });
}

const create = (data: ClientMessage) : Promise<ClientMessage> =>{
    return new Promise((res) => {
      let  newClient = new ClientModel(data.value)
      newClient.save(function(err, client) {
        if(err){
            res({
                type : 'res',
                value : err.message,
                action : data.action,
                id : data.id,
                status : 404
            })
        }else{
        res({
          type : 'res',
          value : client.convert(),
          action : data.action,
          id : data.id,
          status : 200
          })
        }
      })
    });
}

const read = (data:ClientMessage) : Promise <ClientMessage> => {
    return new Promise((res) => {
        ClientModel.findById({_id:data.value.id_client},function(err, client) {
            if (err){
                res({
                        type : 'res',
                        value : err.message,
                        action : data.action,
                        id : data.id,
                        status : 404
                })
            }else{
                if(client){
                    res({
                        type : 'res',
                        value : client.convert(),
                        action : data.action,
                        id : data.id,
                        status : 200
                    })
                }else{
                    res({
                        type : 'res',
                        value : "Ressource not found",
                        action : data.action,
                        id : data.id,
                        status : 404
                    })
                }
            }
        });
    });
}

const remove = (data:ClientMessage) : Promise <ClientMessage> => {
    return new Promise((res) => {
        ClientModel.findByIdAndRemove({_id:data.value.id_client},function(err, client) {
            if (err){
                res({
                        type : 'res',
                        value : err.message,
                        action : data.action,
                        id : data.id,
                        status : 404
                })
            }else{
                if(client){
                    res({
                        type : 'res',
                        value : client.convert(),
                        action : data.action,
                        id : data.id,
                        status : 200
                    })
                }else{
                    res({
                        type : 'res',
                        value : "Ressource not found",
                        action : data.action,
                        id : data.id,
                        status : 404
                    })
                }
            }
        });
    });
}

const update = (data:ClientMessage) : Promise <ClientMessage> => {
    let update = {
        name: data.value.name,
        url:data.value.url,
        img:data.value.img,
        lat:data.value.lat,
        lng:data.value.lng,
        address:data.value.address,
    }

    return new Promise((res) => {
        ClientModel.updateOne({_id:data.value.id_client},update,function(err, result) {
            if (err){
                res({
                        type : 'res',
                        value : err.message,
                        action : data.action,
                        id : data.id,
                        status : 404
                })
            }else{
                if(result.nModified == 0){
                    res({
                        type : 'res',
                        value : "Ressource not found",
                        action : data.action,
                        id : data.id,
                        status : 404
                    })
                }else{
                    res({
                        type : 'res',
                        value : data.value,
                        action : data.action,
                        id : data.id,
                        status : 200
                    })
                }
            }
        });
    });
}
