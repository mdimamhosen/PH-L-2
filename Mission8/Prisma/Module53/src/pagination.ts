import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //  ! Pagination two ways
  // ! 1. Pagination with offset and limit
  // ! 2. Pagination with cursor
  // ! 1. Pagination with offset and limit
  //   const offsetData = await prisma.post.findMany({
  //     skip: 10,
  //     take: 10,
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //     where: {
  //       published: true,
  //     },
  //   });
  //   console.log("Offset Data: ", offsetData.length);
  // ! 2. Pagination with cursor
  //   const cursorData = await prisma.post.findMany({
  //     take: 20,
  //     skip: 10,
  //     cursor: {
  //       id: 25,
  //     },
  //   });
  //   console.log("Cursor Data: ", cursorData.length);
  // ! Sorting
  const sortedData = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
    take: 10,
  });
  console.log("Sorted Data: ", sortedData.length);
};

main();
