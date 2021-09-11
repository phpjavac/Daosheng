import { getThemeVariables } from "ant-design-vue/dist/theme";
// 设置自定义主题
const generateModifyVars = (dark = false) => {
  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    "border-radius-base": "4px",
  };
};

export default generateModifyVars;
