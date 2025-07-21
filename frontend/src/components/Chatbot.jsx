import { useState, useEffect, useRef } from "react";

import api from "../api/axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I’m LawBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);


  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        messages: [
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: "user", content: input },
        ],
      });

      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error. Try again." },
      ]);
    }

    setLoading(false);
  };
  useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, loading]);


  return (
    <>
      {!open && (
  <div className="fixed bottom-9 right-5 z-50">
    <div
      className="
        group
        relative
        w-[150px]   
        h-12
        flex
        justify-end
        overflow-hidden
        rounded-full
        rounded-l-full
        cursor-pointer
      "
      onClick={() => setOpen(true)}
    >
      
      <span
        className="
          absolute
          left-4
          top-0
          h-full
          w-full
          bg-gray-800
          text-cyan-100
          flex
          items-center
          justify-center
          px-3
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          whitespace-nowrap
        "
      >
        LawBot
      </span>

      
      <div
        className="
          h-13
          w-13
          bg-gradient-to-br from-indigo-600 to-purple-600
          flex
          items-center
          justify-center
          text-white
          text-xl
          rounded-full
          transform
          translate-x-0
          group-hover:-translate-x-[100px]
          transition-transform
          duration-500
          z-10
          shadow-xl
        "
        >
          💬
        </div>
      </div>
    </div>
  )}


     
      {open && (
        <div
          className={`fixed bottom-5 right-5 w-80 ${
            minimized ? "h-16" : "h-[70vh]"
          } bg-gray-200 rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50`}
        >
         
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 flex justify-between items-center text-sm">
            <span className="font-semibold">LawBot - AI Assistant</span>
            <div className="flex gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="hover:scale-125 transition"
              >
                {minimized ? "🔼" : "🔽"}
              </button>
              <button
            onClick={() => setOpen(false)}
            className="text-white hover:scale-130 transition bg-amber-50 rounded-full text-[14px]"
          >
            ✖️
          </button>
            </div>
          </div>

         
          {!minimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-200 via-gray-300 to-gray-900 space-y-4">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {msg.role === "assistant" && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mr-2 shrink-0">
          AI
        </div>
      )}

      <div
        className={`px-4 py-3 rounded-lg text-sm max-w-[70%] break-words ${
          msg.role === "user"
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        {msg.content || msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold ml-2 shrink-0">
                  U
                </div>
              )}
            </div>
          ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                    <span className="typing-dot animate-bounce delay-0">•</span>
                    <span className="typing-dot animate-bounce delay-200">•</span>
                    <span className="typing-dot animate-bounce delay-400">•</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>


            
              <div className="border-t border-gray-700 p-2 flex gap-2 items-center bg-gray-900">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your legal query..."
                  className="flex-1 border border-gray-400 bg-gray-50 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="text-gray-700 hover:text-indigo-600 transition text-xl">🎙️</button>
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-3 py-2 rounded hover:scale-105 transition text-sm disabled:opacity-50"
                >
                  Send 
                </button>
              </div>

              
              <div className="bg-gray-800 text-gray-300 text-[13px] text-center px-4 py-2 italic">
              “LawBot empowers you with simplified legal help, 24/7.”
            </div>

            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
