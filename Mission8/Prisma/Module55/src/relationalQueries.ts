import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ! Fluent API -> This is a way to create a post with category by using create and connect by using the model name
  //   ! Another way to get a user with post by using fluent API
  //   const result = await prisma.user
  //     .findUnique({
  //       where: {
  //         id: 1,
  //       },
  //     })
  //     .Post({
  //       where: {
  //         published: true,
  //       },
  //     });
  //   ! This upper code is called fluent API.

  // ! Another way to get a user with post by using include
  const result = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      Post: true,
      profile: true,
    },
  });

  const publishedPostUsers = await prisma.user.findMany({
    where: {
      Post: {
        some: {
          published: true,
        },
      },
    },
    include: {
      Post: {
        where: {
          published: true,
        },
      },
    },
  });

  console.dir(publishedPostUsers, { depth: Infinity });
};

main();
