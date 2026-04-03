import express from "express";
import { runDexter } from "./runDexter";

const app = express();
app.use(express.json());

app.post("/api/dexter/analyze", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "query is required" });
  }

  try {
    const result = await runDexter(query);
    res.json({ result });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});