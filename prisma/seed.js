const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  // Create Users
  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      username: 'john_doe',
      email: 'john@example.com',
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: passwordHash,
    },
  });

  console.log('✅ Users created:', user1.username, user2.username);

  // Create Items
  const item1 = await prisma.item.create({
    data: {
      name: 'Cool Gadget',
      description: 'A really cool gadget for tech enthusiasts.',
    },
  });

  const item2 = await prisma.item.create({
    data: {
      name: 'Best Book Ever',
      description: 'An amazing book full of wisdom and insights.',
    },
  });

  console.log('✅ Items created:', item1.name, item2.name);

  // Create Reviews
  const review1 = await prisma.review.create({
    data: {
      userId: user1.id,
      itemId: item1.id,
      rating: 5,
      text: 'Absolutely love this gadget!',
    },
  });

  const review2 = await prisma.review.create({
    data: {
      userId: user2.id,
      itemId: item2.id,
      rating: 4,
      text: 'Great read, highly recommended!',
    },
  });

  console.log('✅ Reviews created:', review1.text, review2.text);

  // Create Comments
  const comment1 = await prisma.comment.create({
    data: {
      userId: user2.id,
      reviewId: review1.id,
      text: 'I agree! This gadget is fantastic.',
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      userId: user1.id,
      reviewId: review2.id,
      text: 'Couldn’t agree more, brilliant book.',
    },
  });

  console.log('Comments created:', comment1.text, comment2.text);

  console.log('Seeding completed successfully!');
}

// Execute Seed
main()
  .catch((e) => {
    console.error(' Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
