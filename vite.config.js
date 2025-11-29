import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace REPO_NAME with your GitHub repository name
export default defineConfig({
  base: '/quizappreact/', 
  plugins: [react()],
});
