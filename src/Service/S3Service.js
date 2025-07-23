import { S3Client, ListObjectsV2Command,PutObjectCommand,DeleteObjectsCommand,GetObjectCommand } from '@aws-sdk/client-s3';
import ApiResponse from './Response';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export  function S3Connect(credentials) {
    const { accessId, accessKey, region,bucketName } = credentials;
 const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId: accessId,
      secretAccessKey: accessKey,
    },
  });
  return s3;
}
 export const fetchObjects = async (credentials) => {
    const s3 = S3Connect(credentials);
    try {
      const command = new ListObjectsV2Command({
        Bucket: credentials.bucketName,
      });
      const response = await s3.send(command);
        return  ApiResponse(200, 'Objects fetched successfully', response.Contents);
    } catch (error) {
      return  ApiResponse(500, 'Error fetching S3 objects', null);
    }
    
}

// export const uploadFileToS3 = async (credentials, file) => {
//   const s3 = S3Connect(credentials);

//   const params = {
//     Bucket: credentials.bucketName,
//     Key: file.name,
//     Body: file,
//     ContentType: file.type,
//   };

//   try {
//     const command = new PutObjectCommand(params);
//     const response = await s3.send(command);
//     return ApiResponse(200, 'File uploaded successfully', response);
//   } catch (error) {
//     console.error('Upload Error:', error);
//     return ApiResponse(500, 'Error uploading file', null);
//   }
// };

export const uploadFileToS3 = async (credentials, file) => {
  const s3 = S3Connect(credentials);

  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: credentials.bucketName,
      Key: file.name,
      Body: uint8Array,
      ContentType: file.type,
    });

    const response = await s3.send(command);
    return ApiResponse(200, 'File uploaded successfully', response);
    console.log('File uploaded successfully:', response);
  } catch (error) {
    console.error('Upload Error:', error);
    return ApiResponse(500, 'Error uploading file', null);
  }
};
export const deleteMultipleFilesFromS3 = async (credentials, fileNames) => {
  const s3 = S3Connect(credentials);

  if (!Array.isArray(fileNames) || fileNames.length === 0) {
    return ApiResponse(400, 'No files provided for deletion', null);
  }

  const params = {
    Bucket: credentials.bucketName,
    Delete: {
      Objects: fileNames.map(name => ({ Key: name })),
      Quiet: false, // true = no response details; false = response with deleted keys
    },
  };

  try {
    const command = new DeleteObjectsCommand(params);
    const response = await s3.send(command);
    return ApiResponse(200, 'Files deleted successfully', response);
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    return ApiResponse(500, 'Error deleting multiple files', null);
  }
};

    export async function downloadS3File(credentials, objectKey, downloadFilePath="./downloadedFile") {
      const s3 = S3Connect(credentials);
      const getObjectCommand = new GetObjectCommand({
        Bucket: credentials.bucketName,
        Key: objectKey,
      });

      try {
        const response = await s3.send(getObjectCommand);

        if (response.Body instanceof ReadableStream) { // For browser environments
          // Handle the stream in the browser (e.g., create a Blob and trigger download)
          const blob = await new Response(response.Body).blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = objectKey.split('/').pop(); // Use the file name from the key
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else if (response.Body instanceof require('stream').Readable) { // For Node.js environments
          const writeStream = createWriteStream(downloadFilePath);
          response.Body.pipe(writeStream);

          return new Promise((resolve, reject) => {
            writeStream.on('finish', () => resolve(`File downloaded to ${downloadFilePath}`));
            writeStream.on('error', reject);
          });
        } else {
          throw new Error("Unsupported S3 object body type.");
        }
      } catch (error) {
        console.error("Error downloading file from S3:", error);
        throw error;
      }
    }

   export async function downloadS3Filee(credentials, objectKey) {
  const s3 = S3Connect(credentials);
  const getObjectCommand = new GetObjectCommand({
    Bucket: credentials.bucketName,
    Key: objectKey,
  });

  try {
    const response = await s3.send(getObjectCommand);

    if (response.Body instanceof ReadableStream) {
      const blob = await new Response(response.Body).blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank"); // Open the blob URL in a new tab
    } else {
      throw new Error("Unsupported S3 object body type.");
    }
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    throw error;
  }
}
