import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import * as request from '../axios/axios';
export async function refreshAccessToken() {
  try {
    const cookies = parseCookies();
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      console.error("Refresh token not found.");
      return null;
    }

    // Gửi request lên server để refresh token
    const response = await request.post('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Response data is undefined");
    }
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