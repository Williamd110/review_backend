const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getReviewById = async (req, res) => {
  const { itemId, id } = req.params;
  const review = await prisma.review.findFirst({
    where: { id, itemId },
  });
  res.json(review);
};

exports.addReview = async (req, res) => {
  const { id } = req.params; // Item ID
  const { rating, text } = req.body;
  const userId = req.user.id;

  try {
    const review = await prisma.review.create({
      data: { userId, itemId: id, rating, text },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserReviews = async (req, res) => {
  const userId = req.user.id;
  const reviews = await prisma.review.findMany({ where: { userId } });
  res.json(reviews);
};

exports.updateReview = async (req, res) => {
  const { userId, id } = req.params;
  const { rating, text } = req.body;

  const review = await prisma.review.update({
    where: { id, userId },
    data: { rating, text },
  });
  res.json(review);
};
