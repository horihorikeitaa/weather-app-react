import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // グローバルなテスト関数を有効化
    environment: 'jsdom', // テスト環境をブラウザライクに設定
    coverage: {
      provider: 'istanbul', // カバレッジ計測ツール
      reporter: ['text', 'json', 'html'], // カバレッジレポートの形式
      all: true, // 全ファイルを対象にカバレッジを計測
      include: ['src/**/*.{ts,tsx}'], // カバレッジ対象のファイル
    },
  },
  resolve: {
    alias: {
      '@': '/src', // エイリアス設定
    },
  },
});
