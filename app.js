require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');
const mentorRouter = require('./routes/mentors');
const chapterRouter = require('./routes/chaters');
const lessonRouter = require('./routes/lessons');
const reviewRouter = require('./routes/review');
const imageCourseRouter = require('./routes/imageCourse');
const myCourseRouter = require('./routes/myCourses');
const webhookRouter = require('./routes/webhooks');
const orderPaymentRouter = require('./routes/orderPayment');

const refreshTokens = require('./routes/refresTokens');
const verivyToken = require('./middlewares/tokenVerify');
const can = require('./middlewares/premision');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/image-course', verivyToken, can('admin'), imageCourseRouter);
app.use('/my-courses', verivyToken, can('admin', 'student'), myCourseRouter);
app.use('/chapter', verivyToken, can('admin'), chapterRouter);
app.use('/lesson', verivyToken, can('admin'), lessonRouter);
app.use('/review', verivyToken, can('admin', 'student'), reviewRouter);
app.use('/media', verivyToken, can('admin', 'student'), mediaRouter);
app.use('/mentors', verivyToken, can('admin'), mentorRouter);
app.use('/payments', paymentsRouter);
app.use('/orders', verivyToken, can('admin', 'student'), ordersRouter);
app.use('/refresh-tokens', refreshTokens);
app.use('/webhooks', webhookRouter);
app.use('/order', verivyToken, can('admin', 'student'), orderPaymentRouter);

module.exports = app;
