import 'module-alias/register';
import {Producer, Offset, KafkaClient} from 'kafka-node'
import { BeaconMessage, ClientMessage, AuthMessage, ContentMessage } from "../IMessage";
import {ENV} from 'lib';

export const sendKafkaMessage = ( prod: Producer, topicVal: string, msg: BeaconMessage | ClientMessage | AuthMessage | ContentMessage  ) => {
       prod.send([{ topic: topicVal, messages: JSON.stringify(msg) }], () => {
            console.log('send producer', topicVal, msg.type, msg.action, msg.value,msg.status,msg.id);
        });
    };

