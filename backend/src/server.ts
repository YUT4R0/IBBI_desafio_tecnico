import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

const corsSettings = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: "*",
};

app.use(cors(corsSettings));

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
