const moment = require('moment');

exports.ipRequest = (req, res, next) => {
    const ipClient = req.header('x-forwarded-for') || req.connection.remoteAddress;

    console.log('Time:', Date.now());
    console.log('IP:', ipClient);
    next();
}
