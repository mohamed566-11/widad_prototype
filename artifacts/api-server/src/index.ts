import app from "./app.js";

const rawPort = process.env["PORT"] || "5000";
const port = Number(rawPort);

if (process.env["VERCEL"] === "1") {
    console.log("Running in Vercel environment, listener skipped (using exported app).");
} else if (!Number.isNaN(port) && port > 0) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
} else {
    console.log("No valid PORT provided, skipping listener.");
}
