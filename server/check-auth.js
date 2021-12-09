const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    const refreshKey = req.query.reauthToken
    const decoded  = jwt.verify(req.query.token, process.env.JWT_KEY);
            next();
 

    } catch (error) {

        try {
        const refreshTest  = jwt.verify(req.query.reauthToken, process.env.JWT_REFRESH_KEY);
            next();
        } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
        }


    }

}