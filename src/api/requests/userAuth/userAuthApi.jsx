import performRequestBackend from "../../axios";

export const UserAuthApi = {
  login: async (email, password) => {
    const response = await performRequestBackend("/login", "POST", {
      email,
      password,
    });
    return response;
  },
  signup: async (username, email, password) => {
    const response = await performRequestBackend("/register", "POST", {
      username,
      email,
      password,
    });
    return response;
  },
  logout: async () => {
    const response = await performRequestBackend("/logout", "POST");
    return response;
  },
};
