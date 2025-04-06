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
    //  ! Pagination two ways
    // ! 1. Pagination with offset and limit
    // ! 2. Pagination with cursor
    // ! 1. Pagination with offset and limit
    //   const offsetData = await prisma.post.findMany({
    //     skip: 10,
    //     take: 10,
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //     where: {
    //       published: true,
    //     },
    //   });
    //   console.log("Offset Data: ", offsetData.length);
    // ! 2. Pagination with cursor
    //   const cursorData = await prisma.post.findMany({
    //     take: 20,
    //     skip: 10,
    //     cursor: {
    //       id: 25,
    //     },
    //   });
    //   console.log("Cursor Data: ", cursorData.length);
    // ! Sorting
    const sortedData = yield prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            published: true,
        },
        take: 10,
    });
    console.log("Sorted Data: ", sortedData.length);
});
main();
