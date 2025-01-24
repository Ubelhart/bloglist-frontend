module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  globals: {
    vitest: true,
    describe: true,
    test: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    vi: true,  // Asegúrate de incluir 'vi' aquí
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    requireConfigFile: false,
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'strict': 'off',
  },
};
