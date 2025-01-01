const express = require('express');
const { getItems, getItemById, getItemReviews } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.get('/:id/reviews', getItemReviews);

module.exports = router;
