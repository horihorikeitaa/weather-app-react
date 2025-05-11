import path from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    path.resolve(__dirname, '../index.html'),
    path.resolve(__dirname, '../src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
        background: '#F9FAFB',
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};
