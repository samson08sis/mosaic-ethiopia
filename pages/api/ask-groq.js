import axios from "axios";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
// import knowledgeBase from "@/data/packages-and-destinations-data.json";
import knowledgeBase from "@/data/ds-reduced-training-data.json";

// Configure DOMPurify
const window = new JSDOM("").window;
const domPurify = DOMPurify(window);

// Valid Groq Models
const GROQ_MODELS = {
  FASTEST: "mixtral-8x7b-32768",
  RECOMMENDED: "llama3-70b-8192",
  LIGHTWEIGHT: "llama3-8b-8192",
};

// Response Formatting Utilities
function formatToMarkdown(text) {
  return text
    .replace(/^\*\*\*(.*?)\*\*\*\s*$/gm, "### $1")
    .replace(/^\*\*(.*?)\*\*\s*$/gm, "## $1")
    .replace(/^\*(.*?)\*\s*$/gm, "# $1")
    .replace(/^\s*\*\s/gm, "- ")
    .replace(/([^:])\*\*(.*?)\*\*/g, "$1**$2**");
}

function formatToHTML(text) {
  const html = text
    .replace(/\*\*\*(.*?)\*\*\*/g, '<h3 class="header-large">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<h2 class="header-medium">$1</h2>')
    .replace(/\*(.*?)\*/g, '<h1 class="header-small">$1</h1>')
    .replace(/\n/g, "<br>");

  return domPurify.sanitize(html);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    prompt,
    model = "llama3-70b-8192",
    format = "markdown",
    history = [],
  } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (!Object.values(GROQ_MODELS).includes(model)) {
    return res.status(400).json({
      error: "Invalid model",
      validModels: GROQ_MODELS,
    });
  }

  try {
    const messages = [
      ...history,
      {
        role: "user",
        content: `You are a Customer Service Agent. Optionally refer to external sources when necessary, but prioritize using the following info: ${JSON.stringify(
          knowledgeBase,
          null,
          2
        )}\nQuestion: ${prompt}\n\nPlease format your response with:\n***Section Headers*** (most important)\n**Subheaders**\n- Bullet points for lists`,
      },
    ];

    const response = await axios.post(
      process.env.GROQ_API_URL,
      {
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawAnswer = response.data.choices[0].message.content;
    const formattedAnswer =
      format === "html" ? formatToHTML(rawAnswer) : formatToMarkdown(rawAnswer);

    res.status(200).json({
      answer: formattedAnswer,
      components: { tours: [], destinations: [] },
      model_used: model,
      format_used: format,
      tokens_used: response.data.usage?.total_tokens,
      history: [
        ...history,
        { role: "user", content: prompt },
        { role: "assistant", content: rawAnswer },
      ],
    });
  } catch (error) {
    console.error("Groq API Error:", error.message);

    if (error.response?.data?.error?.message?.includes("decommissioned")) {
      return res.status(400).json({
        error: "Model deprecated",
        recommendation: "Use llama3-70b-8192 instead",
        validModels: GROQ_MODELS,
      });
    }

    res.status(500).json({
      error: "Failed to get response from agent. Please try again later.",
      details: error.response?.data?.error?.message || error.message,
    });
  }
}
