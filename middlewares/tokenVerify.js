const jwt = require('jsonwebtoken');
const { JWT_SCARET_TOKEN } = process.env;

module.exports = async (req,res,next)=>{
    const token = req.headers.authorization;

    jwt.verify(token,JWT_SCARET_TOKEN,function(err,decode) {
        if (err) {
            return res.status(403).json({ massage: err.message} );
        }

        req.user = decode;
        return next();
    });

}