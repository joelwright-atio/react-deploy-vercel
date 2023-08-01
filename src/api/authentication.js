import React from "react";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("USER_KEY");
};

export const userLogin = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8180"}/authenticate`,
    data: authRequest,
  });
};

// anything Else
export const fetchUserData = (authRequest) => {
  return axios({
    method: "GET",
    url: `${process.env.hostUrl || "http://localhost:8180"}/api/v1/clocking`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
