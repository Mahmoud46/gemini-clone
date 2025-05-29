# 🤖 Gemini Clone – AI Chat App

A sleek, single-page conversational AI interface inspired by **Google Gemini**, built with **React.js**, **TypeScript**, **SASS**, and powered by the official **Gemini API**. This lightweight clone delivers a responsive chat experience — no login, no routing, just clean and simple AI interaction.

---

## 🚀 Features

- 💬 **Chat-Style Conversation** – Gemini-style prompt & response interaction
- 🌐 **Google Gemini API** – Real-time AI responses powered by Gemini, **gemini-2.0-flash** model.
- 🎨 **SASS Styling** – Fully responsive, modern, and minimalist interface
- ⚛️ **Built with React + TypeScript** – Strongly typed, clean component structure
- 🧠 **Single Page App (SPA)** – No routing, no auth, no distractions

---

## 🛠️ Tech Stack

- **Framework:** React.js
- **Language:** TypeScript
- **Styling:** SASS / SCSS
- **Data Handling:** `fetch` API
- **AI Backend:** [Gemini API via Google AI Studio](https://aistudio.google.com/app)

---

## 📸 Preview

![Gemini Clone Screenshot](src\assets\gemini_clone.gif)

---

## 📁 Folder Structure

```bash
src/
├── assets/
├── config/
│   └── gemini.config.ts
├── context/
│   ├── context.tsx
│   └── context.provider.tsx
├── interfaces/
│   ├── chat.interface.ts
│   └── context.interface.ts
├── components/
│   ├── Main/
│   └── Sidebar/
├── styles/
│   ├── mixins/
│   └── App.module.scss
├── App.tsx
└── main.tsx
```

---

## 🔧 Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/gemini-clone.git
cd gemini-clone
```

2. Install dependencies

```bash
npm install
```

3. Add Gemini API key to `.env` file<br/>
   You can generate a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```env
VITE_GEMINI_API_KEY = your_gemini_api_key_here
```

4. Start the development server

```bash
npm run dev
```

---

## 🙌 Acknowledgements

- Chat UI inspired by [Gemini](https://gemini.google.com/)
- AI powered by [Gemini API](https://aistudio.google.com/app)
