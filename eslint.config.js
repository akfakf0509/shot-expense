import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { readFileSync } from 'fs';

// Parse .gitignore to get ignore patterns
const gitignoreContent = readFileSync('.gitignore', 'utf-8');
const ignorePatterns = gitignoreContent
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
  .map(pattern => {
    // Handle directory patterns
    if (pattern.endsWith('/')) {
      return pattern.slice(0, -1);
    }
    return pattern;
  });

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
