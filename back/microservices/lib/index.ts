import {
    KafkaClient,
    KafkaClientOptions
} from 'kafka-node';
import {ENV} from 'lib/';
console.log(ENV.kafka_port);
const clientOptions: KafkaClientOptions = {kafkaHost: `${ENV.kafka_url}:${ENV.kafka_port}`};
export const kafkaClient: KafkaClient = new KafkaClient(clientOptions);
