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
  getQuotas: async() =>{
    const user_details = localStorage.getItem("user_details")
    const userId = JSON.parse(user_details)
    const response = await performRequestBackend(`/get-quota/${userId?.[0]?.id}`,"GET")
    return response
  }
};
