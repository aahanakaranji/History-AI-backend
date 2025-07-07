import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

// ✅ Allow cross-origin requests
app.use(cors());

// Your test route
app.post("/chat", async (req, res) => {
  const { time, area } = req.body;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: `Tell me one short, super interesting historical fact about ${area} during the ${time}. Keep it to 2-3 sentences maximum.`,
          },
        ],
      }),
    }
  );
  const data = await response.json();
  res.json({ response: data.choices[0].message.content });
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
