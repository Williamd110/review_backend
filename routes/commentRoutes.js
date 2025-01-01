const express = require('express');
const { addComment, getUserComments, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:itemId/reviews/:id/comments', authMiddleware, addComment);
router.get('/me', authMiddleware, getUserComments);
router.put('/:userId/comments/:id', authMiddleware, updateComment);
router.delete('/:userId/comments/:id', authMiddleware, deleteComment);

module.exports = router;
