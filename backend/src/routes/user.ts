import { Request, Response } from "express";
import { prisma } from "../api/prisma";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
    return;
  }
}
