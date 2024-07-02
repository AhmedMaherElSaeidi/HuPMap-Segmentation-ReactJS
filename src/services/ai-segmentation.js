import axios from "axios";
import { HOST, PORT } from "./enviroment";

const API = `http://${HOST}:${PORT}/predict`;

export const segmentByUnet = async (request_data) => {
  return await axios.post(`${API}/unet`, request_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const segmentByScratchUnet = async (request_data) => {
  return await axios.post(`${API}/unet_scratch`, request_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const segmentByFCN = async (request_data) => {
  return await axios.post(`${API}/fcn`, request_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const segmentByLinknet = async (request_data) => {
  return await axios.post(`${API}/linknet`, request_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const segmentByEnsemble = async (request_data) => {
  return await axios.post(`${API}/ensemble`, request_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const segmentMapper = {
  unet: segmentByUnet,
  unet_scratch: segmentByScratchUnet,
  fcn: segmentByFCN,
  linknet: segmentByLinknet,
  ensemble: segmentByEnsemble,
};

export default segmentMapper;
