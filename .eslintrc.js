module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "@vue/typescript/recommended",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: 2018, sourceType: "module" },
  plugins: ["simple-import-sort", "@typescript-eslint", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": "warn",
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or error
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "vue/multi-word-component-names": "off",
  },
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  overrides: [
    {
      files: ["**/*.spec.ts"],
      env: {
        jest: true,
      },
    },
  ],
}
