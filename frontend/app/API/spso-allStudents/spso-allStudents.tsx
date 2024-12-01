import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllStudents() {
  try {
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.get("customer/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return response.data;
    
  } catch (error) {
    console.log("Error fetching all students:", error);
    return null;
  }
}

export async function getPrintHistoryByCustomerId(customerId: number) {
  try {
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.get(`print-history/request/${customerId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return response.data;
    
  } catch (error) {
    console.log("Error fetching print history by customer id:", error);
    return null;
  }
}