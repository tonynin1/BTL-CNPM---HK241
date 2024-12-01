import { setCookie, destroyCookie, parseCookies } from 'nookies';
import * as request from '../axios/axios';


// Đặt thời gian tồn tại cho token (7 ngày)
const COOKIE_OPTIONS = {
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
    path: '/', // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
    secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure khi ở production
};

// Login function
export const login = async (email: string, password: string) => {
    try {
        const response = await request.post('/auth/signin', {
            email: email,
            password: password,
        });

        // Lưu accessToken và refreshToken vào cookie
        setCookie(null, 'accessToken', response.access_token, COOKIE_OPTIONS);
        setCookie(null, 'refreshToken', response.refresh_token, COOKIE_OPTIONS);

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};