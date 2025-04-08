// ! Transactions
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ! Batch Transactions
  //   const createUser = prisma.user.create({
  //     data: {
  //       username: "testuser 2",
  //       age: 25,
  //       email: "test@gmail.com",
  //     },
  //   });

  //   const updateUser = prisma.user.update({
  //     where: { id: 122 },
  //     data: { age: 26 },
  //   });

  //   const [userCreate, userUpdate] = await prisma.$transaction([
  //     createUser,
  //     updateUser,
  //   ]);
  //  ! Interactive Transactions
  const result = await prisma.$transaction(async (tx) => {
    const query1 = await tx.post.findMany({
      where: { published: true },
    });
    const query2_countUser = await tx.user.count();

    const query3_updateUser = await tx.user.update({
      where: { id: 1 },
      data: { age: 26 },
    });

    return {
      query1,
      query2_countUser,
      query3_updateUser,
    };
  });
  console.log(result);
};

main();
