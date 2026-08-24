import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The React plugin was already a dependency but never wired up, so Fast Refresh
// never ran and the build only worked because esbuild transforms JSX on its own.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
