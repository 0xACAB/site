import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js, pluginReact }, extends: ['js/recommended'] },
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },

	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			// suppress errors for missing 'import React' in files
			'react/react-in-jsx-scope': 'off',
			// allow jsx syntax in js files (for next.js project)
			'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }], //should add ".ts" if typescript project
		},
	},
]);