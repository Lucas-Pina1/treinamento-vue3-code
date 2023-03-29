module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-unused-vars": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/*.spec.js'
      ],
      env: {
        jest: true
      }
    }
  ]
}
