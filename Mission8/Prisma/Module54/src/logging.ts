import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
  console.log("Timestamp: " + e.timestamp);
  console.log("Target: " + e.target);
});

const main = async () => {
  const getAllPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });
};

main();
