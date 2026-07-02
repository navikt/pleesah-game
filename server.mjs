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

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
  res.send("OK");
});

const TEAM_NAME_REGEX = /^[a-z0-9-]+$/;
const HEX_FARGE_REGEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// POST /api/v1/team/{team}/create?hex={code}
app.post(`${basePath}/api/havnesjef/team`, (req, res) => {
  const team = req.query.team;
  const hex = req.query.hex;
  if (!team || !TEAM_NAME_REGEX.test(team)) {
    return res.status(400).send("Ugyldig teamnavn");
  }
  if (hex && !HEX_FARGE_REGEX.test(hex)) {
    return res.status(400).send("Ugyldig hex-fargekode");
  }
  const hexUtenHashtag = hex ? hex.replace(/^#/, "") : "";
  const hexParam = hexUtenHashtag
    ? `?hex=${encodeURIComponent(hexUtenHashtag)}`
    : "";
  const url = `http://pleesah-havnesjef/api/v1/team/${encodeURIComponent(team)}/create${hexParam}`;
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

app.get(`${basePath}/api/havnesjef/serviceRunning`, (req, res) => {
  const team = req.query.team;
  fetch(
    `http://pleesah-havnesjef/api/v1/service/status?team=${team}&service=myserv`,
  )
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
