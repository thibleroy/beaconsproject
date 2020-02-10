import 'module-alias/register';
import {Producer} from 'kafka-node'
import { BeaconMessage, ClientMessage, AuthMessage, ContentMessage } from "../IMessage";

export const sendKafkaMessage = ( prod: Producer, topicVal: string, msg: BeaconMessage | ClientMessage | AuthMessage | ContentMessage  ) => {
    
       prod.send([{ topic: topicVal, messages: msg }], (err: Error, data: any) => {
            console.log('send producer', topicVal, msg.type, msg.action, msg.value);
        });
    }