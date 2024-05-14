import "dotenv/config";
import express from "express";
import { router } from "./routes";
import http from "http";
import cors from "cors";
import { swaggerSpec } from "../swaggerConfig";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const serverHttp = http.createServer(app);

app.use(express.json());
app.use(router);

export { serverHttp };
