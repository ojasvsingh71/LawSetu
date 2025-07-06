import { useState } from "react";
import api from "../api/axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // const LawBot_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        messages: [
          ...messages.map(msg => ({
            role: msg === "user" ? "user" : "assistant",
            content: msg.content || msg.text
          })),
          { role: "user", content: input }
        ]
      });

      const botmessage = { role: "assistant", text: res.data.reply };
      setMessages(prev => [...prev, botmessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 flex flex-col items-center z-[9999] ">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            💬
          </button>
          <span className="text-sm mt-1 bg-gray-300 px-2 rounded">LawBot</span>
        </div>
      )}

      {open && (
        <div className={`fixed bottom-5 right-5 w-80 ${minimized ? "h-16" : "h-[70vh]"} bg-white rounded shadow-lg flex flex-col z-[9999]`}>
          <div className="bg-blue-600 text-white p-2 flex justify-between text-sm">
            <span>LawBot</span>
            <div>
              <button onClick={() => setMinimized(!minimized)}>{minimized ? "🔼" : "🔽"}</button>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
          </div>

          {!minimized && (
            <>
              <div className="flex-1 p-2 overflow-y-auto text-sm bg-gray-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 my-1 rounded max-w-[70%] ${msg.role === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-200"
                      }`}
                  >
                    {msg.content || msg.text}
                  </div>
                ))}
                {loading && <div className="p-2 bg-gray-200 rounded mr-auto">Typing...</div>}
              </div>

              <div className="p-2 border-t flex gap-2">
                <input
                  className="flex-1 border rounded px-2 text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask something..."
                />
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
