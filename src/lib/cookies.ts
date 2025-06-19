import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, days: number = 30) => {
  const options = {
    expires: days,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  Cookies.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name, { path: "/" });
};
