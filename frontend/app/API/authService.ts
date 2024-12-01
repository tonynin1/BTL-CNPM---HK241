import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export async function refreshAccessToken() {
  try {
    const cookies = parseCookies();
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      console.error("Refresh token not found.");
      return null;
    }

    const response = await axios.post(
      "http://127.0.0.1:8080/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Lưu token mới vào cookie
    setCookie(null, "accessToken", accessToken, {
      maxAge: 15 * 60, // 15 phút
      path: "/",
    });

    setCookie(null, "refreshToken", newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60, // 30 ngày
      path: "/",
    });

    return accessToken;
  } catch (error) {
    console.log("Failed to refresh access token:", error);
    return null;
  }
}
export function logout() {
    // Xóa token từ cookie
    destroyCookie(null, "accessToken", { path: "/" });
    destroyCookie(null, "refreshToken", { path: "/" });
  
    // Chuyển hướng người dùng (nếu cần)
    window.location.href = "/signin"; // Đưa người dùng đến trang đăng nhập
  }