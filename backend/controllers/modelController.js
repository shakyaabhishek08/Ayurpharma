import axios from "axios";

// LLM API
export const askLLM = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://localhost:8001/ask",
      { text }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "LLM service error" });
  }
};

// ML API
export const askML = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://localhost:5000/ask",
      { text }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "ML service error" });
  }
};
