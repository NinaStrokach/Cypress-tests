module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: 'plugin:cypress/recommended',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always'], // Всегда добавлять точку с запятой в конце утверждения.
    indent: ['error', 2] // Отступ — это два пробела.
  }
};

