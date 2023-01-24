import path from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `bundle.${format}.js`,
      name: 'bundle',
    },
  },
  plugins: [
    dts({
      outputDir: 'lib/types',
    }),
  ],
});
