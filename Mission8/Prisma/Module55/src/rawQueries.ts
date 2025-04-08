import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const post = await prisma.$queryRaw`SELECT * FROM "Post" WHERE id = 1`;
  //   console.log(post);
  const deletePost = await prisma.$queryRaw`TRUNCATE TABLE "users" CASCADE`;
  console.log(deletePost);
};

main();
