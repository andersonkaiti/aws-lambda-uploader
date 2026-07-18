export function response(statusCode: number, body: object | string | null) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}
