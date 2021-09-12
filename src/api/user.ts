import { useRequest } from "zcomposition";

const useUser = () => {
  const login = async (data: any) =>
    useRequest({
      url: "./api/user/login",
      method: "post",
      body: data,
    });
  return {
    login,
  };
};

export default useUser;
