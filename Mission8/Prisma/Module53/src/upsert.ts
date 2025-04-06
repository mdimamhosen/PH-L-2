import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ! Upsert a single post by ID
  //   const res = await prisma.post.upsert({
  //     where: {
  //       id: 1,
  //     },
  //     update: {
  //       title: "Upserted post",
  //       content: "Upserted content",
  //       authorName: "Upserted author",
  //     },
  //     create: {
  //       title: "New post",
  //       content: "New content",
  //     },
  //   });
  //   console.log(res);
  // ! Select
  const res = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      title: true,
    },
  });
  console.log(res);
};

main();
