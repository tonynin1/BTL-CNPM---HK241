import { headers } from 'next/headers';
import * as request from '../axios/axios'

export let accessToken = "";
export let refreshToken = "";
export const signup = async (data : any) => {
    accessToken = "";
    refreshToken = "";
    console.log(data.email)
    // http://127.0.0.1:8080/auth/signup
    try {
        const response = await request.post('/auth/signup', {
            email: data.email,
            password: data.password,
            fname: data.firstname,
            lname: data.lastname,
            phone: data.phone,
            role: data.userType === "student" ? "STUDENT" : "SPSO"
        }).then((res) => {
            accessToken = res.access_token;
            refreshToken = res.refresh_token;
            return res;
        }).then((res) => {

            createDto(data.userType)
            return res;
        })

        return response
    }
    catch (error) {
        console.log(error)
    }
}

async function createDto(userType: string) {

    if (userType !== "student") {
        // http://localhost:8080/spsomember/create
        console.log("bearer: ", accessToken)
        const response = await request.post('/spsomember/create', 
        {
            dob: "2000-01-01",
            "address": "Ba Diem 123",
        }, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error(error);
        });

        console.log(response)
        if (response.status === 201) {
            alert("Signup successfully")
            window.location.href = "/signin"
        }
    }
    else {
        // http://localhost:8080/student/create
        console.log("bearer: ", accessToken)
        const response = await request.post('/customer/create', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            console.error(error);
        });
        
        if (response.status === 201) {
            alert("Signup successfully")
            window.location.href = "/signin"
        }
    }
}


export function logout() {
    accessToken = "";
    refreshToken= "";
}

// confirmPassword
// "123123"

// email
// "daivietvonin1@gmail.com"

// firstname
// "VÕ"

// lastname
// "VIỆT"

// password
// "123123"

// phone
// "0355916621"

// userType
// "student"
// "manager"