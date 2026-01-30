import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { readFileSync } from 'fs';

let ignorePatterns = ['dist', 'node_modules', 'android', 'ios'];

try {
  const gitignoreContent = readFileSync('.gitignore', 'utf-8');
  ignorePatterns = gitignoreContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.startsWith('!'))
    .map(pattern => pattern.endsWith('/') ? pattern.slice(0, -1) : pattern);
} catch (error) {
  console.warn('Could not read .gitignore, using default ignore patterns');
}

export default tseslint.config(
  { ignores: ignorePatterns },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
