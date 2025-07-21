import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Logout } from "../components/Logout";
import api from "../api/axios";
import Tesseract from "tesseract.js";
import { Link } from "react-router-dom";
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { marked } from "marked"

const DocumentTemplate = () => {
  const menuRef = useRef(null);

  const toggleMenu = () => {
    const menu = menuRef.current;
    if (menu) {
      menu.classList.toggle("opacity-0");
      menu.classList.toggle("scale-95");
      menu.classList.toggle("pointer-events-none");
      menu.classList.toggle("opacity-100");
      menu.classList.toggle("scale-100");
      menu.classList.toggle("pointer-events-auto");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState("dark");

  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [showAIModal, setShowAIModal] = useState(false);
  const aiInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  const handleGenerate = async () => {
    setLoading(true);
    const context = aiInputRef.current.value.trim();
    if (context) {
      try {
        const res = await api.post(`/ai/suggest`, {
          context: `${editorText}\n\n---\n\nUser Request: ${context}`,
        });

        setEditorText(res.data.text);

        setSaveStatus("AI-generated content inserted");
      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Generation failed!!! Please try again!!!"
        );
      }
      setLoading(false);
      setShowAIModal(false);
    }
  };

  const handleExport = () => {
    const html = marked(editorText);

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
  <html>
    <head>
      <style>
  .markdown {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #1f2937;
    padding: 3rem;
    font-size: 16px;
  }

  .markdown h1, .markdown h2, .markdown h3 {
    font-weight: 700;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    page-break-after: avoid;
  }

  .markdown p, .markdown ul, .markdown ol, .markdown blockquote, .markdown pre {
    page-break-inside: avoid;
    margin-bottom: 1rem;
  }

  .markdown li {
    page-break-inside: avoid;
  }

  .markdown pre, .markdown blockquote {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  .markdown code {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    font-size: 0.95rem;
  }

  .markdown blockquote {
    border-left: 4px solid #cbd5e0;
    padding-left: 1rem;
    color: #4b5563;
    font-style: italic;
  }

  /* Optional: Add spacing between logical sections */
  .markdown > * + * {
    margin-top: 1rem;
  }
</style>

    </head>
    <body>
      <div class="markdown">
      <h1>${title}</h1>
        ${html}
      </div>
    </body>
  </html>
`;

    html2pdf()
      .set({
        margin: 0,
        filename: `${title || "document"}.pdf`,
        html2canvas: { scale: 2 },
      })
      .from(wrapper)
      .save();
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
      className={`min-h-screen bg-gradient-to-b transition-all duration-300 ${isDarkMode
        ? "from-gray-900 to-black text-white"
        : "from-white to-indigo-600 text-gray-800"
        }`}
    >
      <nav
        className={`shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text">
            LawSetu
          </div>
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <Link
              to="/"
              className={`relative group ${isDarkMode ? "text-indigo-200" : "text-gray-700"
                }`}
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/editor"
              className={`relative group ${isDarkMode ? "text-indigo-200" : "text-gray-700"
                }`}
            >
              Templates
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className={`relative group ${isDarkMode ? "text-indigo-200" : "text-gray-700"
                }`}
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link
              onClick={Logout}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-500 transition duration-300"
            >
              Logout
            </Link>
          </div>
          <div className="md:hidden relative">
            <button
              onClick={toggleMenu}
              className={`text-3xl ${isDarkMode ? "text-indigo-300" : "text-indigo-600"
                } focus:outline-none`}
            >
              ☰
            </button>
            <div
              ref={menuRef}
              className={`absolute right-0 mt-3 w-48 rounded-xl shadow-xl overflow-hidden transition-all duration-300 z-50 border ${isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-800 border-gray-200"
                } opacity-0 scale-95 pointer-events-none`}
            >
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/editor"
                className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
              >
                Templates
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
              >
                Contact
              </Link>
              <Link
                onClick={Logout}
                className="block px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 text-center"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex flex-col md:flex-row p-6 gap-6">
        <aside
          className={`md:w-1/4 rounded-lg shadow p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
          <h2 className="text-lg font-semibold mb-4">Templates</h2>
          <input
            type="text"
            placeholder="Search templates..."
            className={`border rounded w-full px-3 py-2 mb-3 ${isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
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
                  className={`block px-3 py-2 rounded hover:bg-indigo-100 ${isDarkMode ? "text-white hover:bg-indigo-800" : "text-black"
                    }`}
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
                ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
            >
              🤖 Generate with AI
            </button>
            <button
              onClick={() => {
                const clause = `\n\nConfidentiality:\nThe parties agree to maintain the confidentiality of all proprietary or sensitive information shared during the course of this agreement. Such information shall not be disclosed to any third party without prior written consent, except as required by law.`;
                setEditorText((prev) => prev + clause);
                setSaveStatus("Confidentiality clause added");
              }}
              className={`px-3 py-1 rounded ${isDarkMode
                ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
            >
              + Add Confidentiality Clause
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className={`px-3 py-1 rounded ${isDarkMode
                ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
            >
              📤 Upload Your Template
            </button>
          </div>
        </aside>

        <main
          className={`flex-1 p-6 rounded-lg shadow ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
          <div className="flex justify-end mb-4">
            <div
              onClick={() => setIsDarkMode((prev) => !prev)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? "bg-indigo-600" : "bg-gray-300"
                }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? "translate-x-7" : ""
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
            className={`border px-3 py-2 rounded w-full mb-4 ${isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
              }`}
          />

          <h2
            className={`text-xl font-bold mb-4 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
          >
            Document Editor
          </h2>

          <div
            className={`w-full h-96 overflow-y-auto p-4 rounded-lg border ${isDarkMode
              ? "bg-gray-900 text-white border-gray-600"
              : "bg-gray-50 text-black border-gray-300"
              }`}
          >
            <textarea
              className={`w-full h-96 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
                }`}
              value={editorText}
              onChange={(e) => {
                setEditorText(e.target.value);
                setSaveStatus("Saving...");
              }}
              placeholder="Start drafting your legal document here..."
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Live Markdown Preview</h3>
              <div className={`w-full max-h-[400px] overflow-y-auto p-4 rounded-lg border ${isDarkMode ? "bg-gray-900 text-white border-gray-600" : "bg-gray-50 text-black border-gray-300"}`}>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {editorText.trim()}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-2 flex justify-between items-center">
            <span
              className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
            >
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
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div
            className={`border rounded-lg border-indigo-400 p-6 w-full max-w-md shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-indigo-300" : "text-indigo-700"
                }`}
            >
              AI Document Generator
            </h3>
            <p
              className={`mb-3 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              Describe what you want:
            </p>
            <input
              ref={aiInputRef}
              type="text"
              placeholder="e.g., Generate an NDA for a startup"
              className={`w-full border px-3 py-2 rounded mb-4 ${isDarkMode
                ? "bg-gray-700 text-white border-gray-500"
                : "bg-white text-black border-gray-300"
                }`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAIModal(false)}
                className={`px-4 py-2 rounded ${isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {!loading ? "Generate" : "Generating..."}
              </button>
            </div>
          </div>
        </div>
      )}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/10"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div
            className={`p-6 rounded-lg shadow-xl w-96 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
          >
            <h3 className="text-lg font-bold mb-4 text-center">
              Upload Your Template
            </h3>

            {/* Upload Image */}
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async (event) => {
                  const imageData = event.target.result;
                  setSaveStatus("Extracting text from image...");

                  try {
                    const result = await Tesseract.recognize(imageData, "eng", {
                      logger: (m) => console.log(m), // Optional: logs progress
                    });

                    const extractedText = result.data.text;
                    setEditorText((prev) => prev + `\n\n${extractedText}`);
                    setSaveStatus("Text extracted from image and inserted");
                    setShowUploadModal(false);
                  } catch (err) {
                    console.error("OCR failed:", err);
                    alert("Failed to extract text from image.");
                  }
                };

                reader.readAsDataURL(file);
              }}
            />
            <button
              onClick={() => document.getElementById("image-upload").click()}
              className={`w-full mb-3 py-2 rounded ${isDarkMode
                ? "bg-indigo-700 hover:bg-indigo-600"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
            >
              📸 Upload Image
            </button>

            {/* Upload Text File */}
            <input
              type="file"
              id="text-upload"
              accept=".txt"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.name.endsWith(".txt")) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const content = event.target.result;
                    setEditorText((prev) => prev + `\n\n${content}`);
                    setSaveStatus(`Text from "${file.name}" uploaded`);
                    setShowUploadModal(false);
                  };
                  reader.readAsText(file);
                } else {
                  alert("Only .txt files are supported.");
                }
              }}
            />

            <button
              onClick={() => document.getElementById("text-upload").click()}
              className={`w-full mb-3 py-2 rounded ${isDarkMode
                ? "bg-indigo-700 hover:bg-indigo-600"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
            >
              📄 Upload Text File
            </button>

            {/* Upload PDF File */}
            <input
              type="file"
              id="pdf-upload"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async function () {
                  const typedArray = new Uint8Array(reader.result);

                  try {
                    const pdf = await getDocument({ data: typedArray }).promise;
                    let extractedText = "";

                    for (let i = 1; i <= pdf.numPages; i++) {
                      const page = await pdf.getPage(i);
                      const content = await page.getTextContent();
                      const strings = content.items.map((item) => item.str);
                      extractedText += strings.join(" ") + "\n\n";
                    }

                    setEditorText((prev) => prev + `\n\n${extractedText}`);
                    setSaveStatus(`Text extracted from "${file.name}"`);
                    setShowUploadModal(false);
                  } catch (err) {
                    console.error("PDF parsing failed:", err);
                    alert("Failed to extract text from PDF.");
                  }
                };

                reader.readAsArrayBuffer(file);
              }}
            />

            <button
              onClick={() => document.getElementById("pdf-upload").click()}
              className={`w-full mb-3 py-2 rounded ${isDarkMode
                ? "bg-indigo-700 hover:bg-indigo-600"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
            >
              📄 Upload PDF File
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className={`w-full py-2 rounded ${isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTemplate;
