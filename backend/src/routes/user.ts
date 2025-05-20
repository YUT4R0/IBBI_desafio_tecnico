import { Request, Response } from "express";
import { prisma } from "../api/prisma";

type UserProps = {
  id?: number;
  name: string;
  email: string;
  password: string;
  status: string;
};

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
export async function createUser(req: Request, res: Response) {
  const data: UserProps = req.body;

  try {
    await prisma.user.create({
      data,
    });

    res.status(201).json({ message: "User creatred successfully!" });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
    return;
  }
}

export async function updateUser(req: Request, res: Response) {
  const data: UserProps = req.body;

  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    res.status(201).json({ message: "User updated successfully!" });
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

    res.status(201).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
    return;
  }
}
