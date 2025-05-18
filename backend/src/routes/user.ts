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
export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(201);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
    return;
  }
}
