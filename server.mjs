import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = "/kubernetes";

const app = express();

const buildPath = path.join(path.resolve(__dirname, "./dist"));

app.use(basePath, express.static(buildPath, { index: false }));

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
  res.send("OK");
});

app.get(`${basePath}/api/havnesjef/serviceRunning`, (req, res) => {
  const team = req.query.team;
  fetch(`${process.env.HAVNESJEF_URL || "http://havnesjef.admins"}/api/v1/service/status?team=${team}&service=myserv`)
    .then(async (response) => {
      res.set("Cache-Control", "no-store");
      const body = await response.text();
      res.status(response.status).type("json").send(body);
    })
    .catch(() => {
      res.status(502).send("Bad Gateway");
    });
});

app.use(
  `${process.env.VITE_API_PATH}`,
  createProxyMiddleware({
    target: `${process.env.VITE_API_URL}`,
    changeOrigin: true,
    pathRewrite: { [`^${process.env.VITE_API_PATH}`]: "" },
  }),
);

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  res.sendFile(`${buildPath}/index.html`),
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
