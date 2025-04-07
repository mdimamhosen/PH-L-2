import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   const result = await prisma.post.create({
  //     data: {
  //       title: " My first post",
  //       content: " This is my first post",
  //       authorName: "Alice",
  //     },
  //   });

  const getAllPosts = await prisma.post.findMany();
  console.log(getAllPosts);
};

main();
