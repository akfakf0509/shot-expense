import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { readFileSync } from 'fs';

// Parse .gitignore to get ignore patterns
let ignorePatterns = ['dist', 'node_modules', 'android', 'ios']; // Default fallback

try {
  const gitignoreContent = readFileSync('.gitignore', 'utf-8');
  ignorePatterns = gitignoreContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.startsWith('!')) // Skip comments and negations
    .map(pattern => {
      // Handle directory patterns
      if (pattern.endsWith('/')) {
        return pattern.slice(0, -1);
      }
      return pattern;
    });
} catch (error) {
  // Use default ignore patterns if .gitignore can't be read
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
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
