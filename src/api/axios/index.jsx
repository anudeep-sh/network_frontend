import axios from "axios";

const performRequestBackend = async (url, method, body, params) => {
  const token = localStorage.getItem("Token");
  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      Authorization: `Bearer ${token}`,
    },
  });

  return new Promise((resolve, reject) => {
    api
      .request({ method: method, url: url, data: body, params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log("Error in performRequestBackend", error);
      });
  });
};

export default performRequestBackend;
