const BASE_URL = {
  production : "https://api.github.com",
  staging    : "https://api.github.com",
  development: "https://api.github.com",
  localhost  : "https://api.github.com"
};

export const HOST = BASE_URL[process.env.CURRENT_ENV || 'localhost'];

export const API = "";
export const ORIGIN = "WEB";

export const SERVICE = {
  USERS: '/users'
};

export const BACKEND_ENDPOINTS = {
  repos: (username) => `/${username}/repos`,
  user: (username) => `/${username}`
};