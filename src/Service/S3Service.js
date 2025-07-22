import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import ApiResponse from './Response';
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