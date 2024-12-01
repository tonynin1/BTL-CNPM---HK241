import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllPrinters(spsoMemberId: number) {
    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;
    
        if (!accessToken) {
        throw new Error("Access token not found.");
        }
    
        const response = await api.get(`printer/spsoMemberId/${spsoMemberId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return response.data;
        
    } catch (error) {
        console.log("Error fetching all printers:", error);
        return null;
    }
}

export async function OnOffPrinter(printerId: number) {
    // http://localhost:8080/printer/update/:printerId
    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;
    
        if (!accessToken) {
        throw new Error("Access token not found.");
        }
        // get printer by id
        // http://localhost:8080/printer/printerId/1
        const printer = await api.get(`printer/printerId/${printerId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        const status = printer.data.data.status;
        let response = null;
        if (status === 'VALID') {
            console.log("Printer is valid, turning off");
            response = await api.patch(`printer/update/${printerId}`, {
                status: 'INVALID',
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
        } else {
            response = await api.patch(`printer/update/${printerId}`, {
                status: 'VALID',
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
        }
        console.log(response);
        return response.status
    } catch (error) {
        console.log("Error fetching all printers:", error);
        return null;
    }
}