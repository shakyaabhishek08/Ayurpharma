import React, { useState } from "react";
import axios from "axios";

const Models = () => {

  const [activeModel, setActiveModel] = useState("llm");
  const [llmMessages, setLlmMessages] = useState([]);
  const [mlMessages, setMlMessages] = useState([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const restrictedWords = ["dose", "medicine", "davai", "tablet", "drug"];
    const isRestricted = restrictedWords.some(word =>
      input.toLowerCase().includes(word)
    );

    const userMessage = { role: "user", content: input };

    // 🚨 AUTO SWITCH TO ML
    if (activeModel === "llm" && isRestricted) {
      setShowWarning(true);
      setActiveModel("ml");

      setMlMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/model/ml",
          { text: input }
        );

        const botMessage = {
          role: "assistant",
          content: `
Symptom: ${response.data.symptom}
Medicine: ${response.data.medicine.name}
Dose: ${response.data.medicine.dose}
Precaution: ${response.data.medicine.precaution}
`
        };

        setMlMessages((prev) => [...prev, botMessage]);

      } catch (error) {
        setMlMessages((prev) => [
          ...prev,
          { role: "assistant", content: "ML service error" }
        ]);
      }

      setLoading(false);
      return;
    }

    // NORMAL FLOW
    if (activeModel === "llm") {
      setLlmMessages((prev) => [...prev, userMessage]);
    } else {
      setMlMessages((prev) => [...prev, userMessage]);
    }

    setInput("");
    setLoading(true);

    try {
      let response;

      if (activeModel === "llm") {
        response = await axios.post(
          "http://localhost:4000/api/model/llm",
          { text: input }
        );

        const botMessage = {
          role: "assistant",
          content: response.data.answer,
        };

        setLlmMessages((prev) => [...prev, botMessage]);

      } else {
        response = await axios.post(
          "http://localhost:4000/api/model/ml",
          { text: input }
        );

        const botMessage = {
          role: "assistant",
          content: `
Symptom: ${response.data.symptom}
Medicine: ${response.data.medicine.name}
Dose: ${response.data.medicine.dose}
Precaution: ${response.data.medicine.precaution}
`
        };

        setMlMessages((prev) => [...prev, botMessage]);
      }

    } catch (error) {
      const errorMsg = {
        role: "assistant",
        content: error.response?.data?.error || "Server not running",
      };

      if (activeModel === "llm") {
        setLlmMessages((prev) => [...prev, errorMsg]);
      } else {
        setMlMessages((prev) => [...prev, errorMsg]);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[80vh]">

      {/* MODEL SWITCH */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveModel("llm")}
          className={`px-4 py-2 rounded ${
            activeModel === "llm" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          LLM Chatbot
        </button>

        <button
          onClick={() => setActiveModel("ml")}
          className={`px-4 py-2 rounded ${
            activeModel === "ml" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          ML Predictor
        </button>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded">
        {(activeModel === "llm" ? llmMessages : mlMessages).map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[60%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>

      {/* INPUT */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border rounded-l px-4 py-2"
          placeholder="Ask your health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-r"
        >
          Send
        </button>
      </div>

      {/* POPUP */}
      {showWarning && (
        <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded shadow-lg z-50">
          ⚠️ Switching to ML Predictor for accurate medicine recommendation.

          <button
            onClick={() => setShowWarning(false)}
            className="ml-3 bg-white text-black px-2 rounded"
          >
            OK
          </button>
        </div>
      )}

    </div>
  );
};

export default Models;