import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const DocumentTemplate = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("lawsetu-theme") === "dark";
  });

  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [showAIModal, setShowAIModal] = useState(false);
  const aiInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("lawsetu-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    setEditorText(localStorage.getItem("lawsetu-draft") || "");
    setTitle(localStorage.getItem("lawsetu-title") || "");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("lawsetu-draft", editorText);
      localStorage.setItem("lawsetu-title", title);
      setSaveStatus("Saved");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [editorText, title]);

  const handleExport = () => {
    const opt = {
      margin: 0.5,
      filename: `${title || "LawSetu_Document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const tempElement = document.createElement("div");
    tempElement.innerHTML = `<h2>${title}</h2><pre style="font-family:sans-serif;white-space:pre-wrap;">${editorText}</pre>`;
    html2pdf().from(tempElement).set(opt).save();
  };

  const templates = {
    "NDA Agreement":
      "This NDA Agreement is made on [Date] between [Party A] and [Party B].\n\n[Insert NDA clauses here...]",
    "Employment Contract":
      "This Employment Contract is entered into on [Date] between Employer and Employee.\n\n[Insert employment terms here...]",
    "Lease Agreement":
      "This Lease Agreement is made effective as of [Date] between Landlord and Tenant.\n\n[Insert lease terms here...]",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-600 text-gray-800 dark:from-gray-900 dark:to-black dark:text-white transition-all duration-300">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">LawSetu</h1>
        <div className="flex items-center gap-4">
          <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-300">Dashboard</a>
          <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-300">Logout</a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <aside className="md:w-1/4 rounded-lg shadow p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
          <h2 className="text-lg font-semibold mb-4">Templates</h2>
          <input
            type="text"
            placeholder="Search templates..."
            className="border rounded w-full px-3 py-2 mb-3 bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <ul className="space-y-2">
            {Object.keys(templates).map((template) => (
              <li key={template}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTitle(template);
                    setEditorText(templates[template]);
                    setSaveStatus(`\"${template}\" template loaded`);
                  }}
                  className="block px-3 py-2 rounded hover:bg-indigo-100 text-black dark:text-white dark:hover:bg-indigo-800"
                >
                  {template}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => {
                setEditorText("");
                setTitle("");
                setSaveStatus("Draft cleared");
              }}
              className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              + New Template (Manual)
            </button>
            <button
              onClick={() => setShowAIModal(true)}
              className="bg-indigo-100 text-indigo-700 py-2 rounded hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200"
            >
              🤖 Generate with AI
            </button>
            <button
              onClick={() => {
                const clause = `\n\nConfidentiality:\nThe parties agree to maintain the confidentiality of all proprietary or sensitive information shared during the course of this agreement. Such information shall not be disclosed to any third party without prior written consent, except as required by law.`;
                setEditorText((prev) => prev + clause);
                setSaveStatus("Confidentiality clause added");
              }}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200"
            >
              + Add Confidentiality Clause
            </button>
          </div>
        </aside>

        <main className="flex-1 bg-white text-black dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow">
        <div className="flex justify-end mb-4">
          <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-600" : "bg-gray-300"
          }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-7" : ""
            }`}
            ></div>
          </div>
        </div>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaveStatus("Saving...");
            }}
            placeholder="Document Title"
            className="border px-3 py-2 rounded w-full mb-4 bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Document Editor</h2>

          <textarea
            className="w-full h-96 p-4 border rounded-lg bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            value={editorText}
            onChange={(e) => {
              setEditorText(e.target.value);
              setSaveStatus("Saving...");
            }}
            placeholder="Start drafting your legal document here..."
          />

          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">{saveStatus}</span>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Export as PDF
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("lawsetu-draft", editorText);
                  localStorage.setItem("lawsetu-title", title);
                  setSaveStatus("Document manually saved");
                }}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                Save Document
              </button>
            </div>
          </div>
        </main>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800 dark:text-white">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
              AI Document Generator
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
              Describe what you want:
            </p>
            <input
              ref={aiInputRef}
              type="text"
              placeholder="e.g., Generate an NDA for a startup"
              className="w-full border px-3 py-2 rounded mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAIModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const prompt = aiInputRef.current.value.trim();
                  if (prompt) {
                    setEditorText(
                      `AI-generated document based on your request:\n"${prompt}"\n\n[Insert legal clauses here...]`
                    );
                    setShowAIModal(false);
                    setSaveStatus("AI-generated content inserted");
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTemplate;
