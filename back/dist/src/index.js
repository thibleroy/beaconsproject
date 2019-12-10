"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_js_1 = require("./mongo.helper.js");
const http_1 = __importDefault(require("http"));
const express_helper_1 = require("./express.helper");
exports.port = 3000;
express_helper_1.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
const server = http_1.default.createServer(express_helper_1.app);
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
