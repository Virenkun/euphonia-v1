"use server";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "us-east-1", // Replace with your bucket's region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

interface UploadToS3Params {
  fileStream: ReadableStream;
  fileName: string;
  //   fileType: string;
  bucketName?: string; // Optional: Allows specifying a different bucket
}

interface UploadToS3Response {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadToS3({
  fileStream,
  fileName,
  //   fileType,
  bucketName = "euphonia",
}: UploadToS3Params): Promise<UploadToS3Response> {
  try {
    const uniqueFileName = `${uuidv4()}-${fileName}`;
    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      //   ContentType: fileType,
      Body: fileStream,
      ACL: ObjectCannedACL.public_read,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${uniqueFileName}`;
    return { success: true, url: fileUrl };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return { success: false, error: (error as Error).message };
  }
}
