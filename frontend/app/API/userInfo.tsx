
import { refreshAccessToken } from "@/app/API/authService";
import { useRouter} from 'next/navigation'
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import api from "./axiosInstance";

// const router = useRouter()

// Đặt thời gian tồn tại cho token (7 ngày)
const COOKIE_OPTIONS = {
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
    path: '/', // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
    secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure khi ở production
};

// Login function
export async function getUserInfo(){
    try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (!accessToken) {
        // router.push('/signin'); // Điều hướng về trang signin
            return null;
        }

        // http://127.0.0.1:8080/auth/me
        const response = await api.get('auth/me')

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}