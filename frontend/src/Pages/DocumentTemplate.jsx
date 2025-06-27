import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const DocumentTemplate = () => {

  const [isDarkMode, setIsDarkMode] = useState("dark");

  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [showAIModal, setShowAIModal] = useState(false);
  const aiInputRef = useRef(null);



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
    <div
      className={`min-h-screen bg-gradient-to-b transition-all duration-300 ${isDarkMode ? 'from-gray-900 to-black text-white' : 'from-white to-indigo-600 text-gray-800'}`}
    >
      <header
        className={`shadow-md py-4 px-6 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
          LawSetu
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/home"
            className={`${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'} hover:underline`}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'} hover:underline`}
          >
            Logout
          </a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <aside
          className={`md:w-1/4 rounded-lg shadow p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        >
          <h2 className="text-lg font-semibold mb-4">Templates</h2>
          <input
            type="text"
            placeholder="Search templates..."
            className={`border rounded w-full px-3 py-2 mb-3 ${isDarkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
              }`}
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
                  className={`block px-3 py-2 rounded hover:bg-indigo-100 ${isDarkMode ? 'text-white hover:bg-indigo-800' : 'text-black'}`}
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
              className={`py-2 rounded ${isDarkMode
                ? 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
            >
              🤖 Generate with AI
            </button>
            <button
              onClick={() => {
                const clause = `\n\nConfidentiality:\nThe parties agree to maintain the confidentiality of all proprietary or sensitive information shared during the course of this agreement. Such information shall not be disclosed to any third party without prior written consent, except as required by law.`;
                setEditorText((prev) => prev + clause);
                setSaveStatus('Confidentiality clause added');
              }}
              className={`px-3 py-1 rounded ${isDarkMode
                ? 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
            >
              + Add Confidentiality Clause
            </button>
          </div>
        </aside>

        <main
          className={`flex-1 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        >
          <div className="flex justify-end mb-4">
            <div
              onClick={() => setIsDarkMode((prev) => !prev)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-7' : ''}`}
              ></div>
            </div>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaveStatus('Saving...');
            }}
            placeholder="Document Title"
            className={`border px-3 py-2 rounded w-full mb-4 ${isDarkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
              }`}
          />

          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Document Editor
          </h2>

          <textarea
            className={`w-full h-96 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDarkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
              }`}
            value={editorText}
            onChange={(e) => {
              setEditorText(e.target.value);
              setSaveStatus('Saving...');
            }}
            placeholder="Start drafting your legal document here..."
          />

          <div className="mt-2 flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              {saveStatus}
            </span>
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
          <div
            className={`rounded-lg p-6 w-full max-w-md shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}
            >
              AI Document Generator
            </h3>
            <p className={`mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Describe what you want:
            </p>
            <input
              ref={aiInputRef}
              type="text"
              placeholder="e.g., Generate an NDA for a startup"
              className={`w-full border px-3 py-2 rounded mb-4 ${isDarkMode
                ? 'bg-gray-700 text-white border-gray-500'
                : 'bg-white text-black border-gray-300'
                }`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAIModal(false)}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
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
  )
};

export default DocumentTemplate;
