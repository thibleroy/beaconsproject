module.exports = function (app: any) {
    app.use('/beacons', require('./beacon'));
    app.use('/clients', require('./client'));
};
