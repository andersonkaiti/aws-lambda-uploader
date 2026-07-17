import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  target: 'node24',
  minify: true,
  noExternal: [/.*/],
})
