const express = require('express');
const { getReviewById, addReview, getUserReviews, updateReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getUserReviews);
router.post('/:id/reviews', authMiddleware, addReview);
router.put('/:userId/reviews/:id', authMiddleware, updateReview);

module.exports = router;
