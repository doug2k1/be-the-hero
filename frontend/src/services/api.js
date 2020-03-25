import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default {
  register(data) {
    return api.post("/ngos", data);
  },

  login(id) {
    return api.post("/sessions", { id });
  },

  listIncidents(id) {
    return api.get("/incidents", {
      headers: { Authorization: id }
    });
  },

  deleteIncident(id, ngoId) {
    return api.delete(`/incidents/${id}`, {
      headers: { Authorization: ngoId }
    });
  },

  createIncident(data, ngoId) {
    return api.post("/incidents", data, {
      headers: { Authorization: ngoId }
    });
  }
};
