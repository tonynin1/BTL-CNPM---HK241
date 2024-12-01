import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllPendingRequest(customerId: number) {
  try {
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.get(`print-history/request/pending/${customerId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return response.data;
    
  } catch (error) {
    console.log("Error fetching all pending requests:", error);
    return null;
  }
}