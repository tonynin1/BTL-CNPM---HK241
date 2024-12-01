import { parseCookies } from "nookies";
import api from "../axiosInstance";
export async function editUser(fname: string, lname: string, phoneNumber : string){

    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;
    
        if (!accessToken) {
            throw new Error("Access token not found.");
        }
        
        console.log(fname, lname, phoneNumber);
        const response = await api.patch(`users/edit`,{
            fname: fname,
            lname: lname,
            // phone: "0355916621"
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
    
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching print orders by customer id that completed:", error);
        return null;
    }

}