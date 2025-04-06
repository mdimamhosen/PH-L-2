import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ! Delete a single post by ID
  //   await prisma.post.delete({
  //     where: {
  //       id: 3,
  //     },
  //   });
  // ! Delete multiple posts by ID
  //   await prisma.post.deleteMany({
  //     where: {
  //       id: { in: [4, 5] },
  //     },
  //   });
};

main();
