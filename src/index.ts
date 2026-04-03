import express from "express";
import { runDexter } from "./runDexter";

const app = express();
app.use(express.json());

// リクエストログ（最小限）
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  next();
});

app.post("/api/dexter/analyze", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    console.log("400: query is required");
    return res.status(400).json({ error: "query is required" });
  }

  try {
    console.log("runDexter start:", query);
    const result = await runDexter(query);
    console.log("runDexter result:", result);
    res.json({ result });
  } catch (e) {
    console.error("runDexter error:", e);
    res.status(500).json({ error: String(e) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
