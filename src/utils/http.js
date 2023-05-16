import axios from "axios";

/*
예시 : 
useGetApi("challenges");
const headers = {
  ACCESS : "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJzd"
}
useGetApi("challenges", headers);
*/

const BACKEND_URL = "http://test-api.schooloud.cloud/api/v1/";

export async function useGetApi(url, headers, params) {
  const response = await axios.get(BACKEND_URL + url, {
    headers: headers,
    params: params,
  });

  return response;
}

export async function usePostApi(url, requestBody, headers, params) {
  const response = await axios.post(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
    withCredentials: true,
  });
  return response;
}

export async function usePutApi(url, requestBody, headers, params) {
  const response = await axios.put(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
  });

  return response;
}

export async function usePatchApi(url, requestBody, headers, params) {
  const response = await axios.patch(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
  });

  return response;
}

export async function useDeleteApi(url, headers) {
  const response = await axios.delete(BACKEND_URL + url, {
    headers: headers,
  });

  return response;
}
