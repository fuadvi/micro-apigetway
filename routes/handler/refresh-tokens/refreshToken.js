const jwt = require('jsonwebtoken');
const { get } = require('../..');
const apiAdapter = require('../../apiAdapter');

const {
    URL_SERVICE_USER,
    JWT_SCARET_TOKEN,
    JWT_SCARET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req,res) => {
    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({
                status:'error',
                massage:'Invalid Tokens'
            });
        }

        await api.get('/refreshToken', { params:{ refresh_token:refreshToken }} );

        jwt.verify(refreshToken,JWT_SCARET_REFRESH_TOKEN, (err,decode)=>{
            if (err) {
                return res.status(403).json({
                    status:'error',
                    massage:err.massage
                });
            }
            if (email !== decode.data.email) {
                return res.status(400).json({
                    status:'error',
                    massage:'email not valid'
                });
            }
            const token = jwt.sign({ data: decode.data},JWT_SCARET_TOKEN,{expiresIn:JWT_ACCESS_TOKEN_EXPIRED});
            return res.json({
                status:'success',
                data:{
                    token
                }
            })
        });


    } catch (error) {

        if (error.code === 'ECONNREFUSED' ) {
            return res.status(500).json({
                status:'error',
                massage:'service unavailable'
            });
        }

        const {status,data} = error.response;
        return res.status(status).json(data);
    }
}