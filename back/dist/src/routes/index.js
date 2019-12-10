"use strict";
module.exports = function (app) {
    app.use('/beacons', require('./beacon').beaconRouter);
    app.use('/clients', require('./client').clientRouter);
};
