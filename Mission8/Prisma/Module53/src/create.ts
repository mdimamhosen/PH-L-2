import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //! Single create
  const result = await prisma.post.create({
    data: {
      title: "  ",
      content: "  ",
      authorName: " ",
    },
  });
  //  ! Multiple create
  //   const result = await prisma.post.createMany({
  //     data: [
  //       {
  //         title: "My first post",
  //         content: "This is my first post",
  //         authorName: "Alice",
  //       },
  //       {
  //         title: "My second post",
  //         content: "This is my second post",
  //         authorName: "Bob",
  //       },
  //       {
  //         title: "My third post",
  //         content: "This is my third post",
  //         authorName: "Charlie",
  //       },
  //       {
  //         title: "My fourth post",
  //         content: "This is my fourth post",
  //         authorName: "David",
  //       },
  //       {
  //         title: "My fifth post",
  //         content: "This is my fifth post",
  //         authorName: "Eve",
  //       },
  //       {
  //         title: "My sixth post",
  //         content: "This is my sixth post",
  //         authorName: "Frank",
  //       },
  //       {
  //         title: "My seventh post",
  //         content: "This is my seventh post",
  //         authorName: "Grace",
  //       },
  //       {
  //         title: "My eighth post",
  //         content: "This is my eighth post",
  //         authorName: "Heidi",
  //       },
  //       {
  //         title: "My ninth post",
  //         content: "This is my ninth post",
  //         authorName: "Ivan",
  //       },
  //       {
  //         title: "My tenth post",
  //         content: "This is my tenth post",
  //         authorName: "Judy",
  //       },
  //       {
  //         title: "My eleventh post",
  //         content: "This is my eleventh post",
  //         authorName: "Karl",
  //       },
  //       {
  //         title: "My twelfth post",
  //         content: "This is my twelfth post",
  //         authorName: "Leo",
  //       },
  //       {
  //         title: "My thirteenth post",
  //         content: "This is my thirteenth post",
  //         authorName: "Mallory",
  //       },
  //       {
  //         title: "My fourteenth post",
  //         content: "This is my fourteenth post",
  //         authorName: "Nina",
  //       },
  //       {
  //         title: "My fifteenth post",
  //         content: "This is my fifteenth post",
  //         authorName: "Oscar",
  //       },
  //     ],
  //   });
};

main();
