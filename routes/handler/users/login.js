const apiAdapter = require('../../apiAdapter')
const jwt = require('jsonwebtoken');

const {
    URL_SERVICE_USER,
    JWT_SCARET_TOKEN,
    JWT_SCARET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req,res) => {
    try {
        const user = await api.post('/users/login', req.body);
        const data = user.data.data;
        const token = jwt.sign({data},JWT_SCARET_TOKEN,{expiresIn:JWT_ACCESS_TOKEN_EXPIRED});
        const refresToken = jwt.sign({data},JWT_SCARET_REFRESH_TOKEN,{expiresIn:JWT_REFRESH_TOKEN_EXPIRED});

        await api.post('/refreshToken',{ refresh_token: refresToken,user_id:data.id});

        return res.json({
            status: 'success',
            data:{
                token,
                refresh_token:refresToken
            }
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