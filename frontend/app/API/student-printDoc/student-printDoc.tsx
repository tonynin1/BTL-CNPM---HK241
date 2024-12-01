import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllPrinsAvailable(){
    // http://localhost:8080/printer/available
    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;

        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        const response = await api.get(`printer/available`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })


        return response.data;
    } catch (error) {
        console.log("Error fetching all printers available:", error);
        return null;
    }
}