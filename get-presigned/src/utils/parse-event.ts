import type { APIGatewayProxyEvent } from 'aws-lambda'

export function parseEvent(event: APIGatewayProxyEvent) {
  const body = JSON.parse(event.body ?? '{}')

  return {
    body,
  }
}
