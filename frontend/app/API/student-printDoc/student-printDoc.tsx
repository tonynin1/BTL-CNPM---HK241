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

export async function uploadFiles(file: File, printerId: number, docQuantity: number, attribute: string, customerId: number){
    // http://localhost:8080/upload
    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;

        if (!accessToken) {
            throw new Error("Access token not found.");
        }


        const response = await api.post(`upload`, {
            files: file,
            printerId: printerId,
            docQuantity: docQuantity,
            attribute: attribute,
            customerId: customerId
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            }
        })

        return response.data;
    } catch (error) {
        console.log("Error uploading files:", error);
        
    }
}