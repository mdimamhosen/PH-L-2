import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // const createUser = await prisma.user.createMany({
  //   data: [
  //     {
  //       username: "user2",
  //       email: "user2@gmail.com",
  //     },
  //   ],
  // });
  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: "use 2 bio",
  //     userId: 2,
  //   },
  // });
  // const createCategory = await prisma.category.create({
  //   data: {
  //     name: "category 5",
  //   },
  // });
  // ! One way to create a post with category by using create and connect by using the model name
  // const createPost = await prisma.post.create({
  //   data: {
  //     content: "post 4",
  //     title: "post 4",
  //     published: true,
  //     authonId: 1,
  //     PostCategory: {
  //       create: {
  //         Category: {
  //           connect: {
  //             id: 1,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     PostCategory: true,
  //   },
  // });
  // ! Another way to create a post with category by using create and connect by using the id
  // const createPost = await prisma.post.create({
  //   data: {
  //     content: "post 4",
  //     title: "post 4",
  //     published: true,
  //     authonId: 1,
  //     PostCategory: {
  //       create: {
  //         categoryId: 1,
  //       },
  //     },
  //   },
  //   include: {
  //     PostCategory: true,
  //   },
  // });
  // ! include multiple category in one post
  const createPost = await prisma.post.create({
    data: {
      content: "post 5",
      title: "post 5",
      published: true,
      authonId: 1,
      PostCategory: {
        create: [
          {
            categoryId: 1,
          },
          {
            categoryId: 2,
          },
          {
            categoryId: 3,
          },
        ],
      },
    },
    include: {
      PostCategory: true,
    },
  });
};

main();
