import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.159:3333"
});

export default {
  listIncidents(page = 1) {
    return api.get("/incidents", { params: { page } });
  }
};
