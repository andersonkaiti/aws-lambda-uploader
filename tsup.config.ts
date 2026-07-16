import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  platform: 'node',
  target: 'node24',
  minify: true,
  bundle: true,
  outDir: 'dist',
  noExternal: [/.*/],
})
