// routes/dashboardRoutes.js
const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/dashboard/data', getDashboardData);

module.exports = router;
