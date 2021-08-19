const express = require('express');
const router = express.Router();
const handlerReviews = require('./handler/reviews')


router.post('/', handlerReviews.create);
router.put('/:id', handlerReviews.update);
router.delete('/:id', handlerReviews.destroy);
module.exports = router;
