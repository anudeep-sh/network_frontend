import performRequestBackend from "../../axios";

export const UserTreeApi = {
  getUserNetwork: async () => {
    const response = await performRequestBackend("/api/network", "GET");
    return response;
  },
};
