// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // 1) 빌드 출력물 무시
  { ignores: ['dist', 'node_modules'] },

  // 2) JS / JSX에 대한 룰
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        React: 'readonly',        // JSX에서 React 전역 사용 허용
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // JS 기본 추천 룰
      ...js.configs.recommended.rules,

      // React 추천 룰
      ...react.configs.recommended.rules,

      // React Hooks 추천 룰
      ...reactHooks.configs.recommended.rules,

      // React Refresh(Fast Refresh) 전용 룰
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // 쓰지 않는 변수 체크 (대문자+_ 로 시작하는 건 제외)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
    },
  },
];
