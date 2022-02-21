import axios from "axios";

const request = axios.create({
  baseURL: "https://attend-srv.hokia.com.tw",
});

export const loginApi = (data) => request.post("/login", data);
export const signApi = (data, Token) =>
  request.post("/api/sign", data, {
    headers: {
      Authorization: Token,
    },
  });
