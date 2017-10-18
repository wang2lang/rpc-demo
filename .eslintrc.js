module.exports = {
  extends: "standard",
  parserOptions: {
    sourceType: 'module'
  },
  parser: "babel-eslint",
  env: {
    browser: true
  },
  rules: {
    semi: 2
  },
  plugins: [
    "standard",

  ]
};