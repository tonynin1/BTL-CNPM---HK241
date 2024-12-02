
import { refreshAccessToken } from "@/app/API/authService";
import { parseCookies } from 'nookies';
import api from "./axiosInstance"

export async function getUserInfo() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;

      // always refresh token
      if (!accessToken) {
        await refreshAccessToken();
      }

      const response = await api.get("auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gửi token trong header
        },
        withCredentials: true
      });
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user info:", error);
      return null;
    }
}
  