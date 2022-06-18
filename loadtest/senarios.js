import { check } from "k6";
import {
  createFavorite,
  deleteFavorite,
  getLines,
  getPaths,
  getSections,
  getStations,
  login,
  myInfo,
} from "./requests.js";

const checkResponseCode = (res, resCode) => {
  return res["status"] === resCode;
};
const checkIsNotEmptyBody = (res) => {
  return Object.keys(res["body"]).length !== 0;
};
export const subwayLoadTestSenarios = () => {
  const loginRes = login();

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("accessToken") !== "",
  });

  let loginToken = loginRes.json("accessToken");
  check(myInfo(loginToken), { "retrieved member": (obj) => obj.id != 0 });
  check(getStations(loginToken), {
    "retrieved stations": (res) =>
      checkResponseCode(res, 200) && checkIsNotEmptyBody(res),
  });
  check(getLines(loginToken), {
    "retrieved lines": (res) =>
      checkResponseCode(res, 200) && checkIsNotEmptyBody(res),
  });
  check(getSections(loginToken), {
    "retrieved sections": (res) =>
      checkResponseCode(res, 200) && checkIsNotEmptyBody(res),
  });
  check(getPaths(loginToken), {
    "retrieved shortest paths": (res) =>
      checkResponseCode(res, 200) && checkIsNotEmptyBody(res),
  });

  let createFavoriteRes = createFavorite(loginToken);
  check(createFavoriteRes, {
    "create favorite": (res) => checkResponseCode(res, 201),
  });

  let deleteLocation = createFavoriteRes.headers["Location"];
  check(deleteFavorite(deleteLocation, loginToken), {
    "delete favorite": (res) => checkResponseCode(res, 204),
  });
};
