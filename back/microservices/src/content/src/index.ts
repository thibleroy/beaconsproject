import {Consumer, ConsumerOptions, Message} from "kafka-node";
import {ENV} from "lib";
import {ContentMessage,kafkaClient} from "msconnector";
import {IContent} from "lib";
import {ContentModel} from './Content'
import {IContentDocument} from './document'
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, [{ topic:'' + ENV.kafka_topic_content,partition:1}], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: ContentMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    let newContent = new ContentModel(data.value)
                    await newContent.save()
                    data.res.status(200)
                    let msg = {
                        type : 'res',
                        value : newContent.convert(),
                        action : data.action,
                        res : data.res,
                        req : data.req
                    }
                    //TODO : send kafka msg 

                    break;

                case 'list':
                    let contents : IContentDocument[] = await ContentModel.find({id_beacon :data.value.id_beacon})
                 let value : IContent[] = []
                 let beaconsProcessed = 0;
                 contents.forEach(content =>{
                    value.push(content.convert())
                    beaconsProcessed ++
                    if(beaconsProcessed == contents.length){
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
                        let contentRead = await ContentModel.findOne({_id:data.value.id_content})
                        if(!contentRead){
                            throw new Error("Ressource not found")
                        }
                        data.res.status(200)
                        let msg = {
                            type : 'res',
                            value : contentRead.convert(),
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
                        let result = await ContentModel.deleteOne({_id:data.value.id_content})
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
                        //TODO : send kafka msg

                    break;
                case 'update':
                    try {
                        let update = {
                            content : data.value.content,
                            id_beacon : data.value.id_beacon,
                            timestamp:data.value.timestamp
                        }
                        let result = await ContentModel.updateOne({_id:data.value.id_beacon},update)
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
