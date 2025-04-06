import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   Find all posts
  const getAllPosts = await prisma.post.findMany();

  //   Find a post by id
  const getPostById = await prisma.post.findUnique({
    where: {
      id: 1,
    },
  });

  const findfirst = await prisma.post.findFirst({
    where: {
      published: false,
    },
  });
  const findfirstwitherror = await prisma.post.findFirstOrThrow({
    where: {
      published: false,
    },
  });

  //!   prisma.post.____________ After the table name, you can see all the methods available for that table. You can also see the types of the parameters and return values.
};

main();
