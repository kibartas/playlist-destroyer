module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:cypress/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
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
