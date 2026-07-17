import type { APIGatewayProxyEvent } from 'aws-lambda'
import parser from 'lambda-multipart-parser'
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

  return response(200, {})
}
