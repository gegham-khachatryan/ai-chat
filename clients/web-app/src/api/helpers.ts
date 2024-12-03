export function modifyResData(response: { status: any; data: any }) {
  if (response.status) {
    return response ? response.data || response : null;
  }
  return response;
}

export function modifyResError(error: { response: { data: any } }) {
  return Promise.reject(error.response ? (error.response ? error.response.data : error.response) : error);
}
