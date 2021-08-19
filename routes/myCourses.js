const express = require('express');
const router = express.Router();
const handlerMyCourse = require('./handler/myCourses');


router.post('/', handlerMyCourse.create);
router.get('/', handlerMyCourse.get);

module.exports = router;
