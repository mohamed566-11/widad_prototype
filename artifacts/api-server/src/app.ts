import express, { type Express } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPublicDir = path.resolve(__dirname, "../../widad/dist/public");
const frontendIndexFile = path.join(frontendPublicDir, "index.html");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env["VERCEL"] !== "1" && fs.existsSync(frontendPublicDir)) {
    app.use(express.static(frontendPublicDir));

    app.get("*", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            next();
            return;
        }

        res.sendFile(frontendIndexFile);
    });
}

export default app;
