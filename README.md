# pdfTalk

pdfTalk is a RAG (Retrieval-Augmented Generation) application built with **Next.js**. It allows users to upload PDF files, generates embeddings from the content, and enables users to ask questions about the PDF.

## 🚀 Features
- Upload PDFs and generate embeddings for efficient retrieval.
- Ask questions about the PDF content.
- Secure authentication using **Clerk**.
- Scalable vector storage with **Pinecone**.
- Persistent and reliable data storage with **Neon.tech**.
- ORM integration with **Drizzle** for database management.
- File storage using **AWS S3**.
- Advanced AI responses powered by **Gemini**.
- Integration with **Vercel AI SDK** for efficient AI handling.

## 🛠️ Technologies Used
- **Next.js** – Frontend framework.
- **Clerk** – Authentication.
- **Pinecone** – Vector database.
- **Neon.tech** – PostgreSQL database.
- **Drizzle** – Type-safe ORM.
- **AWS S3** – File storage.
- **Gemini** – AI response generation.
- **Vercel AI SDK** – AI handling and integration.

## 📁 Environment Variables
To run this project, set up the following environment variables in your `.env` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

# Database
DATABASE_URL=

# AWS S3 Storage
AWS_REGION=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_BUCKET_NAME=

# Pinecone Vector Database
PINECONE_API_KEY=

# Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=
```

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/pdfTalk.git
cd pdfTalk
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
- Create a `.env` file in the root directory.
- Add the required environment variables listed above.

4. **Run the development server:**
```bash
npm run dev
```

✅ **Open** [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🔍 Usage
1. **Sign in** using Clerk authentication.
2. **Upload** a PDF file.
3. **Ask questions** about the content of the PDF.
4. View AI-generated responses powered by Gemini.

