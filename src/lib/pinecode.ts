import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    apiKey: process.env.PINECODE_API_KEY as string
});

export async function loadS3IntoPinecode(fileKey: string) {
    
}

