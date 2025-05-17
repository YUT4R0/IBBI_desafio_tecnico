import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";

dotenv.config();

const PORT = process.env.PORT;
const domain = process.env.DOMAIN;

const app = express();

const corsSettings = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  methods: "*",
};

app.use(cors(corsSettings));

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at http://${domain}:${PORT}`);
});
