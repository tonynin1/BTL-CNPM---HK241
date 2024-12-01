import api from "./axiosInstance";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const COOKIE_OPTIONS = {
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
    path: '/', // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
    secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure khi ở production
};
export async function refreshAccessToken() {
  try {
    const cookies = parseCookies();
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await api.post(
      "auth/refresh",
      {},
      {
        headers: {
          "Refresh-Token": refreshToken, // Đặt refreshToken trong header
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Cập nhật lại cookie cho accessToken và refreshToken
    setCookie(null, "accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60, // 15 phút cho accessToken
    });
    setCookie(null, "refreshToken", newRefreshToken, COOKIE_OPTIONS);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Hủy token nếu refresh thất bại
    destroyCookie(null, "accessToken");
    destroyCookie(null, "refreshToken");
    throw error;
  }
}
