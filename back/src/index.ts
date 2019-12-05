import {MongoHelper} from './mongo.helper.js';
import http from 'http';
import {app, router} from "./express.helper";
import {Request, Response} from "express";
export const port = 3000;

const server = http.createServer(app);

const getCollection = () => {
    return MongoHelper.client.db('test').collection('totos');
};

server.listen(port);
server.on('listening', async () => {
    try {
        await MongoHelper.connect(`mongodb://localhost:27017/`);
        console.info(`Connected to Mongo!`);
    } catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});

router.get('/todos', (req: Request, res: Response) => {
    const collection: any = getCollection();
    collection.find({}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, description: item.description}});
            res.json(items);
        }
    });
    //res.json({type: 'helloworld'});
});
