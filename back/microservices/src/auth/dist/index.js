"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msconnector_1 = require("msconnector");
const kafka_node_1 = require("msconnector/node_modules/kafka-node");
const lib_1 = require("lib");
const consumerOptions = { fromOffset: false };
const authConsumer = new kafka_node_1.Consumer(msconnector_1.kafkaClient, ['' + lib_1.ENV.kafka_topic_auth], consumerOptions);
authConsumer.on('message', async (message) => {
    const data = JSON.parse(message.value.toString());
    switch (data.type) {
        case ('req'):
            const value = data.value;
            switch (data.action) {
                case 'create':
                    break;
                case 'login':
                    break;
                case 'read':
                    break;
                case 'logout':
                    break;
                default: break;
            }
            break;
        default: break;
    }
});
