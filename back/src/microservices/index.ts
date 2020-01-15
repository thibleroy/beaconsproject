import {
    KafkaClient,
    KafkaClientOptions
} from '@src/microservices/node_modules/kafka-node';
import {ENV} from 'env';
const clientOptions: KafkaClientOptions = {kafkaHost: `${ENV.kafka_url}:${ENV.kafka_port}`};
export const kafkaClient: KafkaClient = new KafkaClient(clientOptions);
