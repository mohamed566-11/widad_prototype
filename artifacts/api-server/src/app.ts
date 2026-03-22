import express, { type Express } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
	res.type("html").send(`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Widad API</title>
		<style>
			body { font-family: Arial, sans-serif; margin: 0; background: #f7f8fa; color: #0f172a; }
			main { max-width: 760px; margin: 6rem auto; padding: 2rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; }
			h1 { margin-top: 0; font-size: 1.75rem; }
			a { color: #0369a1; text-decoration: none; }
			a:hover { text-decoration: underline; }
			p { line-height: 1.6; }
		</style>
	</head>
	<body>
		<main>
			<h1>Widad API is running</h1>
			<p>The API server is online.</p>
			<p>Health check: <a href="/api/healthz">/api/healthz</a></p>
		</main>
	</body>
</html>`);
});

app.use("/api", router);

export default app;
