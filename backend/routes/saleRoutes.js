const express = require('express');
const { recordSale, getSales, getDateSale, getMonthSale, getWeekSale, getYearSale } = require('../controllers/saleController');
const router = express.Router();

router.post('/record', recordSale);
router.get('/', getSales);
router.get('/date', getDateSale);
router.get('/week', getWeekSale);
router.get('/month', getMonthSale);
router.get('/year', getYearSale);

module.exports = router;
