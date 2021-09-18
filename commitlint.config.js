const $$types = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "chore",
  "chore-release",
  "chore-deps",
  "build",
  "ci",
  "release",
  "security",
  "i18n",
  "breaking",
  "config",
  "add",
  "remove",
];
// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
// https://github.com/vidavidorra/commitlint-plugin-function-rules#usage
// 使用 function rules 时，要先禁用同名的rules，否则会重复校验
module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    "type-enum": [2, "always", $$types],
    "header-max-length": [0],
    "function-rules/header-max-length": [
      2, // level: error
      "always",
      (parsed) => {
        if (parsed.header.length < 72) {
          return [true];
        }
        return [false, "提交信息的长度不能超过72个字符"];
      },
    ],
  },
};
