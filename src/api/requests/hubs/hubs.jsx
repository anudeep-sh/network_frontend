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
  },
  getQuota: async () => {
    const response = await performRequestBackend("/get-quotas", "GET");
    return response;
  },
  getWithdrawals: async () => {
    const response = await performRequestBackend("/withdrawals-list/PENDING", "GET");
    return response;
  },
  getApprovedWithdrawals: async () => {
    const response = await performRequestBackend("/withdrawals-list/APPROVED", "GET");
    return response;
  },
  getUsersWallet: async () => {
    const response = await performRequestBackend("/users/wallet-level", "GET");
    return response;
  },
  getUsersDetails: async () => {
    const response = await performRequestBackend("/v1/users-details-by-id", "GET");
    return response;
  },
  postQuota: async (body) => {
    const response = await performRequestBackend("/post-quota", "POST",body);
    return response;
  },
  patchWithdrawalStatusUpdate: async (body) => {
    const response = await performRequestBackend("/update-withdrawal-request", "PATCH",body);
    return response;
  },
  patchUpdateUserDetails: async (body) => {
    const response = await performRequestBackend("/update-bank-details", "PATCH",body);
    return response;
  },
  patchUpdateUserPassword: async (id,body) => {
    const response = await performRequestBackend(`users/${id}/password`, "PATCH",body);
    return response;
  },
  patchUpdateWalletDetails: async (body) => {
    const response = await performRequestBackend(`/v1/update-wallet-details`, "PATCH",body);
    return response;
  },
};
