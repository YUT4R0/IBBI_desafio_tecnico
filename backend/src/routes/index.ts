import express from "express";
import { deleteUser, getUsers } from "./user";

const routes = express.Router();

routes.get("/users", getUsers);
// routes.post("/users", createUser);
// routes.patch("/users", updateUser);
routes.delete("/users/:id", deleteUser);

export { routes };
