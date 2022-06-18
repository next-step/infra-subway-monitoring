import http from "k6/http";

export const BASE_URL = "http://www.mmtos.shop";
const USERNAME = "mmtos@mmtos";
const PASSWORD = "mmtos";

export const login = () => {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });
  const contentTypeHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return http.post(`${BASE_URL}/login/token`, payload, contentTypeHeader);
};

const authHeaders = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
};

export const myInfo = (accessToken) => {
  return http.get(`${BASE_URL}/members/me`, authHeaders(accessToken)).json();
};

export const getStations = (accessToken) => {
  return http.get(`${BASE_URL}/stations`, authHeaders(accessToken));
};

export const getLines = (accessToken) => {
  return http.get(`${BASE_URL}/lines`, authHeaders(accessToken));
};

export const getSections = (accessToken) => {
  return http.get(`${BASE_URL}/lines/2`, authHeaders(accessToken));
};

export const getPaths = (accessToken) => {
  return http.get(
    `${BASE_URL}/paths?source=15&target=125`,
    authHeaders(accessToken)
  );
};
export const createFavorite = (accessToken) => {
  const payload = JSON.stringify({
    source: 15,
    target: 125,
  });
  return http.post(`${BASE_URL}/favorites`, payload, authHeaders(accessToken));
};
export const deleteFavorite = (deletePath, accessToken) => {
  return http.del(`${BASE_URL}${deletePath}`, {}, authHeaders(accessToken));
};
