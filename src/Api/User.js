import axios from 'axios';
import { API, HOST, ORIGIN, SERVICE, BACKEND_ENDPOINTS } from '../Config';
import { version } from '../../package.json';

let headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  // 'X-UA-Source': ORIGIN,
  // 'X-UA-Version': version
};

let userAPI = axios.create({
  baseURL: HOST + API + SERVICE['USERS'],
  headers: headers
});

userAPI.interceptors.request.use(request => {
  if (process.env.NODE_ENV === "production") return request;

  console.log('-----------------');
  console.log('Starting Request', request.method, request.baseURL + request.url);
  console.log(request.params);
  console.log(request.query);
  console.log('-----------------');
  return request;
});

export const getUserAPI = (queries = {}, pagination = {}) => {
  const config = {};
  const username = queries.username;
  delete queries.username;

  config.params = { ...queries, ...pagination };
  return userAPI.get(BACKEND_ENDPOINTS.user(username), config);
};