import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = "/kubernetes";
const app = express();
const buildPath = path.join(path.resolve(__dirname, "./dist"));

app.use(basePath, express.static(buildPath, { index: false }));

app.get([`${basePath}/isAlive`, `${basePath}/isReady`], (req, res) => {
  res.send("OK");
});

const TEAM_NAME_REGEX = /^[a-zA-Z0-9-]{2,63}$/;

// POST /api/v1/team/{team}/create?hex={code}
app.post(`${basePath}/api/team/:team/create`, (req, res) => {
  const team = req.query.team;
  const hex = req.query.hex;

  const url = `${process.env.VITE_API_URL}/team/${encodeURIComponent(team)}/create${hex}`;
  fetch(url, { method: "POST" })
    .then(async (response) => {
      res.set("Cache-Control", "no-store");
      const body = await response.text();
      res.status(response.status).type("json").send(body);
    })
    .catch((err) => {
      res.status(502).send("Bad Gateway");
    });
});

// POST /api/v1/team/{team}/next-task?task=int
app.post(`${basePath}/api/havnesjef/next-task`, (req, res) => {
  const team = req.query.team;
  const task = parseInt(req.query.task); // sjekk dette i prod
  if (!team || !TEAM_NAME_REGEX.test(team)) {
    return res.status(400).send("Ugyldig teamnavn");
  }
  if (!/^\d+$/.test(task)) {
    return res.status(400).send("Ugyldig oppgavenummer");
  }
  const url = `${process.env.VITE_API_URL}/api/v1/team/${encodeURIComponent(team)}/next-task?task=${encodeURIComponent(task)}`;
  fetch(url, { method: "POST" })
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
  process.env.VITE_API_PATH,
  createProxyMiddleware({
    target: process.env.VITE_API_URL,
    changeOrigin: true,
  }),
);

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  res.sendFile(`${buildPath}/index.html`),
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
