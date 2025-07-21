
# ⚖️ LawSetu - AI-Powered Legal Document Assistant

LawSetu is a full-stack AI-driven web application that simplifies legal documentation. Users can draft contracts, upload existing documents (PDFs, images, text), generate legal content using AI, and export the result in cleanly styled PDF format using Markdown. The app also supports Google OAuth, password reset, and a rich markdown editor for seamless user experience.

---

<img width="1900" height="867" alt="Screenshot 2025-07-21 203810" src="https://github.com/user-attachments/assets/6d62442d-9c04-41c8-9b6b-441c553cb98e" />

---

## 🔍 Features

- ✅ **User Authentication** (Google OAuth + JWT)
- 🧠 **AI-Powered Legal Drafting** (OpenAI API)
- 📝 **Markdown-Based Rich Editor**
- 📤 **Document Upload Support** (PDF/Image/Text with OCR)
- 📥 **Export as PDF (Markdown Rendered)**
- 📚 **Legal Templates (e.g. NDA, Employment, Lease)**
- 🧾 **Live Preview of Markdown Drafts**
- 🌓 **Dark Mode Toggle**

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Markdown + Remark Plugins
- React Router
- html2pdf.js

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (Google Strategy)
- OpenAI API
- pdfjs-dist (PDF Parsing)

---

## 🌐 Deployed Links

- **Frontend:** [https://law-setu.vercel.app](https://law-setu.vercel.app)
- **Backend:** [https://lawsetu.onrender.com](https://lawsetu.onrender.com)

---

## 🧪 How It Works

- Users can sign in using Google or regular email-password.
- Choose a template or start writing in Markdown.
- Use AI to generate content by giving prompts.
- Upload `.pdf`, `.txt`, or image files to extract and edit text.
- Live Markdown preview is shown beside the editor.
- Export the document as a stylized PDF.

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/lawsetu.git

2.  **Frontend Setup**
    
    ```
    cd frontend
    npm install
    npm run dev
    ```
    
3.  **Backend Setup**
   
    
    ```
    cd backend
    npm install
    npm run dev
    ``` 
    
4.  **Create `.env` file in `backend/`**
    
    
    ```
    PORT=5000
    MONGO_URI=your_mongodb_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_secret
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=https://law-setu.vercel.app
    ``` 
    

----------

## 📦 Folder Structure


```
lawsetu/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
├── frontend/
│   ├── components/
│   ├── pages/
│   └── ...
``` 

----------

## 📅 Future Enhancements

-   🔐 Role-based access (e.g., lawyer vs client)
    
-   📬 Email PDF to user after export
    
-   🌍 Multilingual support
    
-   🧾 More legal templates
    
-   🧠 Fine-tuned legal AI assistant
