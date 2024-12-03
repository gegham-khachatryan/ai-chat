import axios from 'axios';
import { modifyResData, modifyResError } from './helpers';

const API_BASE_URL = '/v0/api';
const AUTH_BASE_URL = '/v0/auth';

const apiServiceInstance = axios.create({
  baseURL: API_BASE_URL
});

const authServiceInstance = axios.create({
  baseURL: AUTH_BASE_URL
});

apiServiceInstance.interceptors.response.use(modifyResData, modifyResError);
authServiceInstance.interceptors.response.use(modifyResData, modifyResError);

function setDefaultHeader(header: string, value: string | null) {
  apiServiceInstance.defaults.headers.common[header] = value;
  authServiceInstance.defaults.headers.common[header] = value;
}

function getStreamHeaders() {
  const { Authorization } = apiServiceInstance.defaults.headers.common;
  return {
    Authorization: Authorization as string,
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };
}

export { apiServiceInstance, authServiceInstance, API_BASE_URL, AUTH_BASE_URL, setDefaultHeader, getStreamHeaders };
