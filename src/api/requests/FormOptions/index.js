import performRequestBackend from "../../axios";

export const FormOption = {
  createFormOptions: async (body) => {
    const response = await performRequestBackend("/form-options", "POST", body);
    return response;
  },
  updateFormOptions: async (id, body) => {
    const response = await performRequestBackend(
      `/form-options/${id}`,
      "PUT",
      body
    );
    return response;
  },
  getFormOptions: async (path) => {
    const response = await performRequestBackend(
      `/form-options/${path}`,
      "GET"
    );
    return response;
  },
};
