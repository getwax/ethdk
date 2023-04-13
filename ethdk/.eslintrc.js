module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist/**/*', 'node_modules/**/*'],
  rules: {
    indent: ['error', 2],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
  },
}
