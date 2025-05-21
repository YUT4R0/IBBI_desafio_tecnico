import { PrismaClient } from "@prisma/client";

// ENVIRONMENT
// const prisma = new PrismaClient({
//   log: ["query"],
//   //... other configuration
// });

// PRODUCTION
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export { prisma };
