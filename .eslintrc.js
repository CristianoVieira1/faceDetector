module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'import', 'react-svg'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@screens', './src/views/*'],
          ['@utils', './src/shared/utils/*'],
          ['@hooks', './src/shared/hooks/*'],
          ['@components', './src/shared/components/*'],
          ['@routes', './src/routes/*'],
          ['@assets', './src/assets/*'],
          ['@services', './src/services/*'],
          ['@viewModels', './src/viewModels/*'],
          ['@test_utils', './test-utils.tsx'],
        ],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg'],
      },
    },
  },
  rules: {
    'no-process-env': 'off',
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-unused-vars': 'error',
    'import/namespace': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jest/no-identical-title': 2,
    'import/no-duplicates': 2,
    'jest/valid-expect': 2,
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling']],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
