import axios from "axios";

const apiConfig = axios.create({ baseURL: "/api" });

export const request = async (params) => {
  const response = await apiConfig.request({ ...params });
  return response;
};
