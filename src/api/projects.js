import axios from "axios";

export function apiPostProject(payload) {
  return axios.post("/api/projects", payload);

  return new Promise(resolve => {
    setTimeout(() => {
      if (payload.name.length < 5) {
        resolve({
          status: 400,
          errorMessages: ["project name should be greater than 5 characters"]
        });
      }
      resolve({
        status: 204,
        name: payload.name
      });
    }, 1000);
  });
}
