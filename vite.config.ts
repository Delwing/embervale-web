import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mudix from '@delwing/mudix/vite';

export default defineConfig({
    base: './',
    plugins: [mudix(), react()],
});
