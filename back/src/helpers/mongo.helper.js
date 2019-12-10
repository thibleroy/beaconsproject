"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.connect = function (url) {
        return new Promise(function (resolve, reject) {
            mongodb_1["default"].MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    };
    MongoHelper.prototype.disconnect = function () {
        MongoHelper.client.close();
    };
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
