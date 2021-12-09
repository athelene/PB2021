const jwt = require('jsonwebtoken');
var formidable = require('formidable');

module.exports = (req, res, next) => {
    try {
//get token from form
    let form = new formidable.IncomingForm();
    let formFields =  new Promise (function (resolve, reject) {
        form.parse(req, function (err, fields) {
                    if (err) {
                reject(err);
                return;
                    }
                resolve([fields]);
                 }) //end of form.parse
                }) //end of promise
                .then((fields, files) => {

 //Check token       
    const decoded  = jwt.verify(fields[0].token, process.env.JWT_KEY);
        req.userTicket = decoded;
            next();
                })

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

}