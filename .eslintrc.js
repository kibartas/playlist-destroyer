module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': "error",
    'react/react-in-jsx-scope': 0
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['cypress/**/*', 'src/__tests__/*', 'src/setupTests.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
