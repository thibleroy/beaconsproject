import 'module-alias/register';
import {ENV} from "lib";
import {Producer} from '../node_modules/kafka-node'
import { BeaconMessage, ClientMessage, AuthMessage } from "../IMessage";

export const sendKafkaMessage = ( prod: Producer, msg: BeaconMessage | ClientMessage | AuthMessage ) => {
    
       prod.send([{ topic: '' + ENV.kafka_topic_beacon, messages: msg }], (err: Error, data: any) => {
            console.log('send producer', data);
        });
    }