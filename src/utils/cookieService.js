import Cookies from "universal-cookie";

const cookies = new Cookies();

const getCookieDomain = () => {
  if (window.location.hostname === "localhost") {
    return "localhost";
  }
  return ".grc.com";
};

const isProduction = () => {
  return window.location.hostname !== "localhost";
};

export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, {
    ...options,
    // domain: "192.168.1.12",
    // domain: getCookieDomain(),
    secure: isProduction(),
    // secure: false,
    sameSite: "Strict",
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name, { domain: getCookieDomain() });
};
