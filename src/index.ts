import express from "express";
import { Agent } from "./dexter-jp/src/agent/agent";

const app = express();

// JSON パース（必須）
app.use(express.json());

// リクエストログ（デバッグ用）
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Dexter API
app.post("/api/dexter/analyze", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      console.error("Missing query in request body");
      return res.status(400).json({ error: "Missing query" });
    }

    console.log("Running Dexter with query:", query);

    const agent = await Agent.create();
    let finalAnswer = null;

    for await (const event of agent.run(query)) {
      console.log("Dexter event:", event);
      if (event.type === "done") {
        finalAnswer = event.answer;
      }
    }

    return res.json({ answer: finalAnswer });

  } catch (err) {
    console.error("Dexter error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      detail: String(err)
    });
  }
});

// Render が渡す PORT を使う（必須）
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
