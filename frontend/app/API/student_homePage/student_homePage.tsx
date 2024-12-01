import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function createFeedBack(customerId: number, rating: number, contentBySPSO: string) {
    try {
        console.log(customerId, rating, contentBySPSO);
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;

        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        const response = await api.post(`feedback/create`, {
            customerId,
            rating,
            contentBySPSO
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })


        if (response.data.message === "You already have a feedback") {
            // update feedback
            // http://localhost:8080/feedback/update/1
            console.log(customerId, rating, contentBySPSO);
            const res = await api.patch(`feedback/update/customer/${customerId}`, {
                rating,
                contentBySPSO
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            console.log(res.data);
            return res.data;
        }
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log("Error creating feedback:", error);
        return null;
    }
}