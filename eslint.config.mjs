import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 모든 파일에 대한 기본 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17 이상에서는 필요 없음
    },
  },

  // 기본 ESLint 및 플러그인 설정
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig, // Prettier 설정

  // Jest 테스트 파일에 대한 설정
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest, // Jest 환경 설정
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Jest 파일에서도 React 17 이상 설정 적용
    },
  },
];
