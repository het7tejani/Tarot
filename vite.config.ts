import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {
      name: 'blog-static-images',
      generateBundle() {
        const imageDir = path.resolve(__dirname, 'public/blog-images');
        for (const file of fs.readdirSync(imageDir).filter(name => /^pack-\d+\.json$/.test(name))) {
          const images: Record<string, string> = JSON.parse(fs.readFileSync(path.join(imageDir, file), 'utf8'));
          for (const [id, uri] of Object.entries(images)) {
            if (!/^\d+$/.test(id) || !uri.startsWith('data:image/webp;base64,')) throw new Error('Invalid blog photo pack');
            this.emitFile({type: 'asset', fileName: `blog-images/${id}.webp`, source: Buffer.from(uri.split(',')[1], 'base64')});
          }
        }
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
