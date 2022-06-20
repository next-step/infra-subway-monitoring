import http from "k6/http";
import { check } from "k6";

const BASE_URL = "https://soob-forest.n-e.kr";

export const goFirstPage = () => {
  let response = http.get(`${BASE_URL}`);

  check(response, {
    "go first page successfully": (response) => response.status === 200,
  });
};

export const login = (email, password) => {
  let payload = JSON.stringify({
    email,
    password,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    "logged in successfully": (response) =>
      response.status === 200 && response.json("accessToken") !== undefined,
  });
};

export const goPathFindPage = () => {
  let response = http.get(`${BASE_URL}/path`);

  check(response, {
    "go path find page successfully": (response) => response.status === 200,
  });
};

export const findPath = (source, target) => {
  let response = http.get(
    `${BASE_URL}/paths?source=${source}&target=${target}`
  );
  check(response, {
    "find path successfully": (response) => response.status === 200,
  });
};
