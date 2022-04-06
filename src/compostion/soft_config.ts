import { reactive, toRefs } from "vue";
import { SoftService } from "../services/index";

const SoftConfig = () => {
  /** 获取版本信息 */
  const getSoftConfig = () => {
    const softConfig = reactive({
      copyRightValue: "",
      softName: "",
      useCas: "",
    });
    SoftService.softConfig().then((data) => {
      softConfig.copyRightValue = data.copyRightValue;
      softConfig.softName = data.softName;
      softConfig.useCas = data.useCas;
    });
    return toRefs(softConfig);
  };
  return {
    getSoftConfig,
  };
};
export default SoftConfig;
