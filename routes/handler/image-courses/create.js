const apiAdapter = require('../../apiAdapter')

const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const imageCorse = await api.post('/api/image-course', req.body);
        return res.json(imageCorse.data)
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                massage: 'service unavailable'
            });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}