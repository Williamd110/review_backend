# review_backend
Project board:
https://github.com/users/Williamd110/projects/4

// Prisma Schema for the Review Site

model User {
  id       String   @id @default(uuid())
  username String   @unique
  email    String   @unique
  password String
  reviews  Review[]
  comments Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Item {
  id          String   @id @default(uuid())
  name        String
  description String?
  averageRating Float   @default(0)
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  itemId    String
  item      Item     @relation(fields: [itemId], references: [id])
  rating    Int
  text      String?
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, itemId]) 

model Comment {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  reviewId  String
  review    Review   @relation(fields: [reviewId], references: [id])
  text      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
