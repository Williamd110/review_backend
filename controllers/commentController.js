const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addComment = async (req, res) => {
  const { itemId, id } = req.params; // Item & Review ID
  const { text } = req.body;
  const userId = req.user.id;

  const comment = await prisma.comment.create({
    data: { userId, reviewId: id, text },
  });
  res.status(201).json(comment);
};

exports.getUserComments = async (req, res) => {
  const userId = req.user.id;
  const comments = await prisma.comment.findMany({ where: { userId } });
  res.json(comments);
};

exports.updateComment = async (req, res) => {
  const { userId, id } = req.params;
  const { text } = req.body;

  const comment = await prisma.comment.update({
    where: { id, userId },
    data: { text },
  });
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const { userId, id } = req.params;

  await prisma.comment.delete({
    where: { id, userId },
  });
  res.json({ message: 'Comment deleted successfully' });
};
