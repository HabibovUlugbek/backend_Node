const express = require('express');
const errorMiddleware = require("../middleware/error")
const categoriesRoute = require('../routes/categories');
const customersRoute = require('../routes/customers');
const coursesRoute = require('../routes/courses');
const entrollmentsRoute = require('../routes/enrollments');
const userRoute = require("../routes/users")
const authRoute = require("../routes/auth")


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories', categoriesRoute);
    app.use('/api/customers', customersRoute);
    app.use('/api/courses', coursesRoute);
    app.use('/api/enrollments', entrollmentsRoute);
    app.use('/api/users', userRoute)
    app.use('/api/auth', authRoute)
    app.use(errorMiddleware)

}