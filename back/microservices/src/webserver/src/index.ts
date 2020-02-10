import {app} from "./express.helper";
import {ENV} from "lib";
import {Router,Request, Response} from "express";
import {MainRouter} from './routes/route';
import {Consumer, ConsumerOptions, Message} from "kafka-node";
import {kafkaClient ,ResourceMessage} from "msconnector";

const def = Router();

def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});

app.use('/clients',MainRouter)
app.use('/hello',def)

app.listen(ENV.api_port, function () {
    console.log('App listening on port '+ENV.api_port);
});

const consumerOptions: ConsumerOptions = {fromOffset: false};
const authConsumer: Consumer = new Consumer(kafkaClient, 
    [
        { topic:'' + ENV.kafka_topic_auth, partition:1},
        { topic:'' + ENV.kafka_topic_beacon,partition:1},
        { topic:'' + ENV.kafka_topic_client,partition:1},
        { topic:'' + ENV.kafka_topic_content,partition:1},
    ], consumerOptions);
authConsumer.on('message', async (message: Message) => {
    const data: ResourceMessage  = JSON.parse(message.value.toString());
    switch (data.type) {
        case ('res'):
            data.res.send({value:data.value})
            break;
        default: break;
    }
})