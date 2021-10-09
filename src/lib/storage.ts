export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const getItem = (key: string): string =>
  sessionStorage.getItem(key) ?? "";
export const getAccessToken = (): string => getItem(ACCESS_TOKEN_KEY) ?? "";
