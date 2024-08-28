import performRequestBackend from "../../axios";

export const WalletsRequests = {
  getWallet: async () => {
    const response = await performRequestBackend("/wallet", "GET");
    return response;
  },
  getWalletHistory: async () => {
    const response = await performRequestBackend("/wallet-history", "GET");
    return response;
  },
  getWithdrawalHistory: async () => {
    const response = await performRequestBackend(
      "/withdrawals-list/APPROVED",
      "GET"
    );
    return response;
  },
  WithdrawalRequest: async (withdrawal_amount) => {
    const response = await performRequestBackend("/withdrawal", "POST", {
      withdrawal_amount,
    });
    return response;
  },

  WithdrawalRequestById: async () => {
    const response = await performRequestBackend("/withdrawal", "GET");
    return response;
  },
  // approveJoin: async ( shortcode, level ) => {
  //   const response = await performRequestBackend("POST", {
  //     shortcode,
  //     level,
  //   });
  //   return response;
  // },
};
