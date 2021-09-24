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
// https://github.com/folke/devmoji#default-devmoji-reference
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
    "scope-enum": [0],
    "function-rules/scope-enum": [
      2,
      "always",
      (parsed) => {
        const regScope = new RegExp(/[a-zA-Z]{2,20}-[0-9]{1,20}/, "gm");
        if (parsed.scope) {
          if (regScope.test(parsed.scope)) {
            return [true];
          }
          return [false, "jira 任务号不正确"];
        }
        return [
          false,
          "请填写 jira 任务号 \neg:\n fix(DCAW-900): 修复跳转链接",
        ];
      },
    ],
  },
};
