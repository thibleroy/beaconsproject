import {kafkaClient} from 'msconnector';
import {Consumer, ConsumerOptions, Message} from 'msconnector/node_modules/kafka-node';
import {ENV} from 'lib';
import {AuthMessage} from 'msconnector/IMessage';
import {IUser} from 'lib';
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, ['' + ENV.kafka_topic_auth], consumerOptions);
authConsumer.on('message', (message: Message) => {
    const data: AuthMessage  = JSON.parse(message.value.toString());

    switch (data.type) {

        case ('req'):

            switch (data.action) {

                case 'login':
                    const user: IUser = data.value;
                    break;

                case 'logout':

                    break;
                default: break;
            }
            break;

        default: break;

    }
});
