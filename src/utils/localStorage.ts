export const getToken = (): string | null => {
  const userInfos = localStorage.getItem("USER_TOKEN");
  if (userInfos) {
    return JSON.parse(userInfos).token;
  }
  return null;
};

export const setToken = (token: string): void => {
  localStorage.setItem("USER_TOKEN", JSON.stringify({ token }));
};

export const removeToken = (): void => {
  localStorage.removeItem("USER_TOKEN");
};
