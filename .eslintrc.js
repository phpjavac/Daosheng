module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:vue/vue3-recommended"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
    "import/extensions": "off",
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "max-classes-per-file": ["error", 2],
    quotes: [1, "double"],
    "no-console": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "import/no-extraneous-dependencies": "off", // package 引入包
  },
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      },
    },
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
