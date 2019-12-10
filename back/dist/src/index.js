"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("./mongo.helper");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const bodyparser = __importStar(require("body-parser"));
exports.app = express_1.default();
require('./routes/index')(exports.app);
exports.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
exports.app.use(bodyparser.json());
exports.port = 3000;
const server = http_1.default.createServer(exports.app);
server.listen(exports.port);
server.on('listening', async () => {
    try {
        await mongo_helper_1.MongoHelper.connect(`mongodb://localhost:27017/`);
        console.info(`Connected to Mongo!`);
    }
    catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
});
