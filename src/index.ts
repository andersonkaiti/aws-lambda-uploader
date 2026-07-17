import { randomUUID } from 'node:crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import type { APIGatewayProxyEvent } from 'aws-lambda'
import parser from 'lambda-multipart-parser'
import { s3Client } from './clients/s3-client.ts'
import { env } from './config/env.ts'
import { response } from './utils/response.ts'

export async function handler(event: APIGatewayProxyEvent) {
  const {
    files: [file],
  } = await parser.parse(event)

  if (!file) {
    return response(400, {
      error: 'File is required.',
    })
  }

  const command = new PutObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: `${randomUUID()}-${file.filename}`,
    Body: file.content,
  })

  const s3Response = await s3Client.send(command)

  return response(200, s3Response)
}
