import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import reportWebVitals from './infrastructure/reportWebVitals';

// QueryClientのインスタンスを作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // データを5分間新鮮とみなす
      gcTime: 7 * 24 * 60 * 60 * 1000, // キャッシュを7日間保持
      retry: 2, // 失敗時に2回リトライ
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // リトライ間隔(指数バックオフ可能)
      refetchOnWindowFocus: false, // フォーカス図に再フェッチをするか（業務システムではfalseを推奨）
    },
    mutations: {
      retry: 1,
      retryDelay: 3000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* QueryClientProviderでアプリ全体をラップ */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
