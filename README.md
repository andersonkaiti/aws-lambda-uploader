# AWS Lambda Uploader

Função AWS Lambda que recebe um arquivo via `multipart/form-data` e o armazena em um bucket do Amazon S3, retornando a resposta da operação de upload.

![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?logo=awslambda&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?logo=amazons3&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

## Stack

| Categoria              | Tecnologia              | Versão |
|------------------------|-------------------------|--------|
| Runtime                | Node.js                 | 24     |
| Linguagem              | TypeScript              | 7      |
| Plataforma             | AWS Lambda              | —      |
| Armazenamento          | Amazon S3               | —      |
| SDK AWS                | @aws-sdk/client-s3      | 3      |
| Parser de upload       | lambda-multipart-parser | 1      |
| Bundler                | tsup                    | 8      |
| Formatação / Lint      | Biome                   | 2      |
| Gerenciador de pacotes | pnpm                    | latest |

## Fluxo — upload direto (`uploader`)

O arquivo trafega pela Lambda: o cliente envia o arquivo via `multipart/form-data` e o handler faz o `PutObject` no S3.

```mermaid
sequenceDiagram
  participant C as Client
  participant H as Handler
  participant S3 as Amazon S3

  C->>H: POST /upload (multipart/form-data)
  alt Arquivo ausente
    H-->>C: 400 { error: "File is required." }
  else Arquivo presente
    H->>S3: PutObjectCommand (uuid + filename)
    S3-->>H: PutObjectCommandOutput
    H-->>C: 200
  end
```

## Fluxo — presigned URL (`presigned`)

O arquivo **não** trafega pela Lambda: o cliente pede uma URL assinada informando apenas o `filename`, e faz o upload direto para o S3 com essa URL. A URL assinada expira em **60 segundos**.

```mermaid
sequenceDiagram
  participant C as Client
  participant H as Handler
  participant S3 as Amazon S3

  C->>H: POST { filename }
  alt filename inválido
    H-->>C: 400 { error }
  else filename válido
    H->>H: getSignedUrl(PutObjectCommand, uuid + filename)
    H-->>C: 200 { url }
    C->>S3: PUT url (arquivo, expira em 60s)
    S3-->>C: 200
  end
```

## Variáveis de ambiente

```env
BUCKET_NAME=nome-do-seu-bucket
BUCKET_REGION=us-east-1
```

## Uso

```bash
pnpm install
pnpm build
```
