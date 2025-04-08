import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const andFiltering = await prisma.post.findMany({
    where: {
      AND: [
        {
          title: {
            contains: "test",
          },
        },
        {
          content: {
            contains: "try",
          },
        },
      ],
    },
  });

  // OR Filtering
  const orFiltering = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: "test",
          },
        },
        {
          content: {
            contains: "try",
          },
        },
      ],
    },
  });
  //   NOT Filtering
  const notFiltering = await prisma.post.findMany({
    where: {
      NOT: {
        title: {
          contains: "test",
        },
      },
    },
  });
  // IN Filtering
  const nameArray = ["test", "try"];

  const inFiltering = await prisma.post.findMany({
    where: {
      title: {
        in: nameArray,
      },
    },
  });

  //   ! IN Filtering with OR
  const inFilteringWithOr = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            in: nameArray,
          },
        },
        {
          content: {
            in: nameArray,
          },
        },
      ],
    },
  });

  //   Indepth Filtering

  const indepthFiltering = await prisma.user.findMany({
    include: {
      Post: {
        include: {
          author: true,
          PostCategory: true,
        },
      },
    },
  });
  console.dir(indepthFiltering, { depth: Infinity });

  //   console.log("AND Filtering: ", andFiltering);
  //   console.log("OR Filtering: ", orFiltering);
  //   console.log("NOT Filtering: ", notFiltering);
  //   console.log("IN Filtering: ", inFiltering);
  //   console.log("IN Filtering with OR: ", inFilteringWithOr);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
