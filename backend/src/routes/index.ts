import express from "express";
import { getUsers } from "./user";

const routes = express.Router();

routes.get("/users", getUsers);
// routes.post("/users", createUser);
// routes.patch("/users", updateUser);
// routes.delete("/users", deleteUser);

export { routes };
