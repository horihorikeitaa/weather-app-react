import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // プロジェクトのルートディレクトリを明示的に指定
  root: path.resolve(__dirname, '..'),
  // PostCSSの設定ファイルのパスを明示的に指定
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'),
  },
});
