const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getItems = async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.findUnique({ where: { id } });
  res.json(item);
};

exports.getItemReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await prisma.review.findMany({ where: { itemId: id } });
  res.json(reviews);
};
