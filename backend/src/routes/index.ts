import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./user";

const routes = express.Router();

routes.get("/users", getUsers);
routes.post("/users", createUser);
routes.patch("/users", updateUser);
routes.delete("/users/:id", deleteUser);

export { routes };
