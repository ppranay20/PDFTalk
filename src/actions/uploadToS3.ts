'use server'

import { S3 } from 'aws-sdk';

// configure the s3
const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
});

// action for uploading
export async function uploadToS3(file: File) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileKey = `uploads/${Date.now()}-${file.name}`;
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type,
        }
        
        const response = await s3.upload(uploadParams).promise();
        
        return {
            success: true,
            data: {
                fileName: file.name,
                fileKey
            }
        }

    } catch (err) {
        console.error("S3 Upload Error: ", err);
        return  { success: false, error: "File upload failed"}
    }
}

