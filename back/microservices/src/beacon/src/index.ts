import {BeaconMessage,kafkaClient} from "msconnector";
import {Consumer, ConsumerOptions, Message} from 'kafka-node';
import {ENV} from "lib";
import {IBeacon} from "lib";
import {BeaconModel} from "./Beacon";
import {IBeaconDocument} from './document';
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_beacon], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: BeaconMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'create':
                    let newBeacon = new BeaconModel(data.value)
                    await newBeacon.save()
                    data.res.status(200)
                    let msg = {
                        type : 'res',
                        value : newBeacon.convert(),
                        action : data.action,
                        res : data.res,
                        req : data.req
                    }
                    //TODO : send kafka msg 
                    break;

                case 'list':
                 let beacons : IBeaconDocument[] = await BeaconModel.find({id_client :data.value.id_client})
                 let value : IBeacon[] = []
                 let beaconsProcessed = 0;
                 beacons.forEach(beacon =>{
                    value.push(beacon.convert())
                    beaconsProcessed ++
                    if(beaconsProcessed == beacons.length){
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
                let beaconRead = await BeaconModel.findOne({_id:data.value.id_beacon})
                if(!beaconRead){
                    throw new Error("Ressource not found")
                }
                data.res.status(200)
                let msg = {
                    type : 'res',
                    value : beaconRead.convert(),
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
                        let result = await BeaconModel.deleteOne({_id:data.value.id_beacon})
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
                            uuid: data.value.uuid,
                            minor: data.value.minor,
                            major: data.value.major,
                            name: data.value.name,
                            id_client: data.value.id_client,
                            id_content: data.value.id_content
                        }
                        let result = await BeaconModel.updateOne({_id:data.value.id_beacon},update)
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
