import { S3Client, S3, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '@providers/config.provider';
import { Request } from 'express';
import { dayjs } from '@utils/dayjs.util';
import { generateID } from '@providers/nanoid.provider';
import { ExpressRequest } from '@interfaces/express.interface';
import { typeToExtension } from '@utils/mime-types.util';

const client = new S3Client({
  apiVersion: 'v4',
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_KEY,
  },
  region: config.S3_REGION,
});

export class S3Service {
  constructor() {}

  initialize() {
    // TODO: Create Bucket if not exist
  }

  getKeyFromUri = (s3Uri: string) => {
    const prefix = `s3://${config.S3_BUCKET}/`;
    if (s3Uri.startsWith(prefix) === false) {
      return s3Uri;
    }

    return s3Uri.replace(prefix, '');
  };

  fetchObject = (s3Uri: string) => {
    const key = this.getKeyFromUri(s3Uri);
    return client.send(
      new GetObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: key,
      })
    );
  };

  createGetSignedUrl = (s3Uri: string) => {
    const key = this.getKeyFromUri(s3Uri);
    return getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: key,
      }),
      {
        expiresIn: 3600,
      }
    );
  };

  createPutSignedUrl = async (request: ExpressRequest) => {
    const key = `uploads/${request.session.account.ID}/${generateID()}`;

    const uploadURL = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: `${key}.${typeToExtension(request.body.type)}`,
      }),
      {
        expiresIn: 3600,
      }
    );

    return {
      uploadURL,
      key,
    };
  };
}
