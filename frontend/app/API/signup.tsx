import { setCookie, destroyCookie, parseCookies } from 'nookies';
import * as request from '../axios/axios';
import { toast } from 'react-toastify';

// Đặt thời gian tồn tại cho token (7 ngày)
const COOKIE_OPTIONS = {
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
    path: '/', // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
    secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure khi ở production
};

// Hàm đăng ký
export const signup = async (data: any) => {
    try {
        const response = await request.post('/auth/signup', {
            email: data.email,
            password: data.password,
            fname: data.firstname,
            lname: data.lastname,
            phone: data.phone,
            role: data.userType === 'student' ? 'STUDENT' : 'SPSO',
        });

        // Lưu accessToken và refreshToken vào cookie
        setCookie(null, 'accessToken', response.access_token, COOKIE_OPTIONS);
        setCookie(null, 'refreshToken', response.refresh_token, COOKIE_OPTIONS);

        // Tạo tài khoản chi tiết theo userType
        await createDto(data.userType);

        return response;
    } catch (error) {
        console.error(error);
    }
};

// Hàm tạo thông tin chi tiết
async function createDto(userType: string) {
    try {
        // Lấy accessToken từ cookie
        const accessToken = getAccessTokenFromCookie();

        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        if (userType !== 'student') {
            console.log('Bearer: ', accessToken);

            const response = await request.post(
                '/spsomember/create',
                {
                    dob: '2000-01-01',
                    address: 'Ba Diem 123',
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Signup successfully');
                window.location.href = '/signin';
            }
        } else {
            console.log('Bearer: ', accessToken);

            const response = await request.post(
                '/customer/create',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Signup successfully');
                window.location.href = '/signin';
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Hàm lấy accessToken từ cookie
export function getAccessTokenFromCookie(): string | null {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie
            .split('; ')
            .find((row) => row.startsWith('accessToken='));
        return cookies ? cookies.split('=')[1] : null;
    }
    return null;
}

// Hàm đăng xuất (xóa cookie)
export function logout() {
    destroyCookie(null, 'accessToken', { path: '/' });
    destroyCookie(null, 'refreshToken', { path: '/' });
    toast.info('Bạn đã đăng xuất khỏi hệ thống');
    window.location.href = '/signin';
}
