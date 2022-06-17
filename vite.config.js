import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
		vuetify({
			autoImport: true,
		}),
		VitePWA({
			mode: 'development',
			base: '/',
			srcDir: 'src',
			filename: 'sw.ts',
			includeAssets: ['favicon.png'],
			strategies: 'injectManifest',
			manifest: {
				name: 'Carpediem',
				short_name: 'CP',
				theme_color: '#ffffff',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	/* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
