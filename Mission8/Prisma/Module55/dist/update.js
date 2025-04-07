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
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log("Disconnected from the database.");
}));
