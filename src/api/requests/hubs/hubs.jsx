import performRequestBackend from "../../axios";

export const hub = {
  addMember: async (shortcode,level) => {
    const response = await performRequestBackend("/network", "POST",{shortcode,level});
    return response;
  },
  getHubs: async () => {
    const response = await performRequestBackend("/get-hub", "GET");
    return response;
  },
};
