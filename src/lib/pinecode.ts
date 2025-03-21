import { downloadFromS3 } from "@/actions/uploadToS3";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import md5 from 'md5';
import { convertToAscii } from "./utils";
import { generateEmbeddings } from "./embeddings";

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: {
      pageNumber: string;
    };
  };
};

export async function loadS3IntoPinecode(fileKey: string) {
  console.log("Downloading S3 into file system");
  const fileName = await downloadFromS3(fileKey);
  if (!fileName) {
    throw new Error("could not download from S3");
  }
  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];
  const documents = await Promise.all(pages.map(prepareDocument));
  
  const vectors = await Promise.all(documents.flat().map(embedDocuments));
  await createIndex();
  const index = pc.index("chatpdf").namespace(fileKey);
  await index.upsert(vectors);
}

async function embedDocuments(doc: Document) {
    try {
        const embeddings = await generateEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: String(doc.metadata.text),
                pageNumber: Number(doc.metadata.pageNumber)
            }
        }
    } catch (error) {
        console.log("error embeddings document", error);
        throw error;
    }
}

async function createIndex() {
  const indexName = "chatpdf";
  const isIndexExists = await pc.describeIndex("chatpdf");
  if(isIndexExists) {
    return;
  }
  
  await pc.createIndex({
    name: indexName,
    dimension: 768,
    metric: 'cosine',
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1'
      }
    }
  })
}

export const truncateStringBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, '');
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringBytes(pageContent,36000)
      }
    }),
  ]);

  return docs;
}
