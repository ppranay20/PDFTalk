const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function generateEmbeddings(content: string) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
        const result = await model.embedContent(content);
        
        return result.embedding.values;
    } catch (error) {
        console.error("Failed to generate embeddings",error);
        throw error
    }
}