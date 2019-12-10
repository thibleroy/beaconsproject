"use strict";
module.exports = function (app) {
    app.use('/beacons', require('./beacon'));
    app.use('/clients', require('./client'));
};
