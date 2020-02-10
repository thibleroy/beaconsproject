import {
    KafkaClient,
    KafkaClientOptions
} from 'kafka-node';
import {ENV} from 'lib';
console.log(ENV.kafka_port);
const clientOptions: KafkaClientOptions = {kafkaHost: `${ENV.kafka_url}:${ENV.kafka_port}`};
export const kafkaClient: KafkaClient = new KafkaClient(clientOptions);

export {sendKafkaMessage} from './utils/kafka'

export {AuthMessage,BeaconMessage,ClientMessage,ContentMessage} from './IMessage'

export {InitiateMongoServer,disconnectFromDB} from './helpers/mongo.helper'
