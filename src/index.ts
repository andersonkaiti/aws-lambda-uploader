import type { APIGatewayProxyEvent } from 'aws-lambda'

export async function handler(_event: APIGatewayProxyEvent) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, from Lambda!',
    }),
  }
}
