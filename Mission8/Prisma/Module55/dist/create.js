"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const createPost = yield prisma.post.create({
        data: {
            content: "post 4",
            title: "post 4",
            published: true,
            authonId: 1,
            PostCategory: {
                create: {
                    // Category: {
                    //   connect: {
                    //     id: 1,
                    //   },
                    // },
                    categoryId: 1,
                },
            },
        },
        include: {
            PostCategory: true,
        },
    });
});
main();
