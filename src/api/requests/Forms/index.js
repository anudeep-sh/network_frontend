import performRequestBackend from "../../axios";

export const Forms = {
    createFormUser: async (body) => {
      const response = await performRequestBackend("/forms", "POST",body);
      return response;
    },
}