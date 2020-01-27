import * as instances from 'msconnector';
import {ENV} from 'lib';
import {Consumer, ConsumerOptions, Producer, ProducerOptions} from "kafka-node";
const consumerOptions: ConsumerOptions = {fromOffset: false};
const topics = ['' + ENV.kafka_topic_auth, '' + ENV.kafka_topic_client, '' + ENV.kafka_topic_beacon];
export const apiConsumer: Consumer = new Consumer(instances.kafkaClient, topics, consumerOptions);
export const apiProducer: Producer = new Producer(instances.kafkaClient);
