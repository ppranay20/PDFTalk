import { generateEmbeddings } from "./embeddings";
import { pc } from "./pinecode";

type Metadata = {
    text: string;
    pageNumber: number;
}

export async function getMatchedEmbeddings(embeddings: number[], fileKey: string) {
    try {
        const index = await pc.Index('pdftalk');
        const response = await index.namespace(fileKey).query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true
        });
    
        return response.matches || [];
    } catch(error) {
        console.log(`error quering embeddings`, error);
        throw new Error("Error Quering embeddings");
    }
}

export async function getContext(query: string, fileKey: string) {
    const queryEmbeddings = await generateEmbeddings(query);
    const matches = await getMatchedEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches!.filter(
        (match) => match.score && match.score > 0.3
    );

    let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
    return docs.join("\n").substring(0,3000);
}