import http from "http";
import { servePageHTML, isValidRoute } from "./utils.js";

const port = 3000;

const server = http.createServer(async (req, res) => {
  console.log("New request:", req.url);

  if (!isValidRoute(req.url)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Invalid request");
    return;
  }

  const response = await servePageHTML(req.url);
  res.writeHead(response.statusCode, {
    "Content-Type": response.contentType,
    "Content-Security-Policy": "default-src 'self'",
  });
  res.end(response.data);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
