"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_js_1 = require("./mongo.helper.js");
const http_1 = __importDefault(require("http"));
const express_helper_1 = require("./express.helper");
exports.port = 3000;
const server = http_1.default.createServer(express_helper_1.app);
const getCollection = () => {
    return mongo_helper_js_1.MongoHelper.client.db('test').collection('totos');
};
server.listen(exports.port);
server.on('listening', async () => {
    try {
        await mongo_helper_js_1.MongoHelper.connect(`mongodb://localhost:27017/`);
        console.info(`Connected to Mongo!`);
    }
    catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});
express_helper_1.router.get('/todos', (req, res) => {
    const collection = getCollection();
    collection.find({}).toArray((err, items) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        }
        else {
            items = items.map((item) => { return { id: item._id, description: item.description }; });
            res.json(items);
        }
    });
    //res.json({type: 'helloworld'});
});
