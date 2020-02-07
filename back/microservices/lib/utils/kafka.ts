import 'module-alias/register';
import {ENV} from "lib";
import {Producer} from '../node_modules/kafka-node'
import { BeaconMessage, ClientMessage, AuthMessage, ContentMessage } from "../IMessage";

export const sendKafkaMessage = ( prod: Producer, topicVal: string, msg: BeaconMessage | ClientMessage | AuthMessage | ContentMessage  ) => {
    
       prod.send([{ topic: topicVal, messages: msg }], (err: Error, data: any) => {
            console.log('send producer', data);
        });
    }