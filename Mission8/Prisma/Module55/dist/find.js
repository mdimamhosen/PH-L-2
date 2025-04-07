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
    //   Find all posts
    const getAllPosts = yield prisma.post.findMany();
    //   Find a post by id
    const getPostById = yield prisma.post.findUnique({
        where: {
            id: 1,
        },
    });
    const findfirst = yield prisma.post.findFirst({
        where: {
            published: false,
        },
    });
    const findfirstwitherror = yield prisma.post.findFirstOrThrow({
        where: {
            published: false,
        },
    });
    //!   prisma.post.____________ After the table name, you can see all the methods available for that table. You can also see the types of the parameters and return values.
});
main();
