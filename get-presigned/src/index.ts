import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { APIGatewayProxyEvent } from 'aws-lambda'
import { z } from 'zod'
import { s3Client } from './clients/s3-client.ts'
import { env } from './config/env.ts'
import { parseEvent } from './utils/parse-event.ts'
import { response } from './utils/response.ts'

const getObjectPresignedURLSchema = z.object({
  filename: z.string(),
})

const ONE_MINUTE = 60

export async function handler(event: APIGatewayProxyEvent) {
  const { data, error } = getObjectPresignedURLSchema.safeParse(
    parseEvent(event).body,
  )

  if (error) {
    return response(400, error.message)
  }

  const command = new GetObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: data.filename,
  })

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: ONE_MINUTE,
  })

  return response(200, { url })
}
