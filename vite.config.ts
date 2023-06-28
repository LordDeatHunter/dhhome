import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.join(__dirname, ".cert/key.pem")),
      cert: fs.readFileSync(path.join(__dirname, ".cert/cert.pem")),
    }    
  },
  build: {
    target: 'esnext',
  },
});
