module.exports = function (app: any) {
    app.use('/beacons', require('./beacon').beaconRouter);
    app.use('/clients', require('./client').clientRouter);
};
