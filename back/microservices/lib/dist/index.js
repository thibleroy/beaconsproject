"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_node_1 = require("kafka-node");
const lib_1 = require("lib/");
console.log(lib_1.ENV.kafka_port);
const clientOptions = { kafkaHost: `${lib_1.ENV.kafka_url}:${lib_1.ENV.kafka_port}` };
exports.kafkaClient = new kafka_node_1.KafkaClient(clientOptions);
