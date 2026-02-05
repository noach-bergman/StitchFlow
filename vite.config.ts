
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load variables from .env files
  const env = loadEnv(mode, process.cwd(), '');
  
  // Vercel puts variables in process.env. We ensure they are captured even if loadEnv misses them.
  const supabaseUrl = env.SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  const apiKey = env.API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true
    },
    define: {
      // These strings will be replaced literally in the source code during build
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.SUPABASE_URL': JSON.stringify(supabaseUrl),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(supabaseKey)
    }
  };
});
