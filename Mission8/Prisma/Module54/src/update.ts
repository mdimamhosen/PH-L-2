import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //! simple update
  //   await prisma.post.update({
  //     where: {
  //       id: 3,
  //     },
  //     data: {
  //       title: "Updated title",
  //       content: "Updated content",
  //       authorName: "Updated author name",
  //     },
  //   });
  //! update many
  //   await prisma.post.updateMany({
  //     where: {
  //       published: false,
  //     },
  //     data: {
  //       published: true,
  //       title: "Updated title",
  //       content: "Updated content",
  //       authorName: "Updated author name",
  //     },
  //   });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  });
