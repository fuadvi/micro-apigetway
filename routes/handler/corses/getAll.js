const apiAdapter = require('../../apiAdapter')

const {
    URL_SERVICE_COURSE,
    HOSTNAMEE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const courses = await api.get('/api/course', {
            params: {
                ...req.query,
                status: 'published'
            }
        });

        const CourseData = courses.data;
        const firstPage = CourseData.data.first_page_url.split("?").pop();
        const lastPage = CourseData.data.last_page_url.split("?").pop();

        CourseData.data.first_page_url = `${HOSTNAMEE}/courses?${firstPage}`;
        CourseData.data.last_page_url = `${HOSTNAMEE}/courses?${lastPage}`;

        if (CourseData.data.next_page_url) {
            const nextPage = CourseData.data.next_page_url.split('?').pop();
            CourseData.data.next_page_url = `${HOSTNAMEE}/courses?${nextPage}`;
        }

        if (CourseData.data.prev_page_url) {
            const prevPage = CourseData.data.prev_page_url.split('?').pop();
            CourseData.data.prev_page_url = `${HOSTNAMEE}/courses?${prevPage}`;
        }

        CourseData.data.path = `${HOSTNAMEE}/courses`

        return res.json(CourseData)
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