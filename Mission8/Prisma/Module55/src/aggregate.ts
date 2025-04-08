import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const agg = await prisma.user.aggregate({
    _avg: {
      age: true,
    },
    _count: {
      age: true,
    },
    _sum: {
      age: true,
    },
    _min: {
      age: true,
    },
    _max: {
      age: true,
    },
  });
  console.log(agg);
  //   Group by and Having

  const agg2 = await prisma.user.groupBy({
    by: ["username"],
    orderBy: {
      username: "desc",
    },
    where: {
      email: {
        contains: "user1",
      },
    },
  });
  console.log(agg2);
  //   ! If I use groupBy, I can use _count, _avg, _sum, _min, _max in the having clause and I must use _count, _avg, _sum, _min, _max in the having clause.
  const agg3 = await prisma.user.groupBy({
    by: ["username"],
    having: {
      age: {
        _avg: {
          gt: 20,
        },
      },
    },
  });
  console.log(agg3);
};

main();
