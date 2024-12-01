// http://localhost:8080/print-history/request/completed/:customerId
import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getPrintOrdersByCustomerIdThatCompleted(customerId: number) {
  try {
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.get(`print-history/request/completed/${customerId}`, {
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

export async function getPrintOrdersByCustomerId(customerId: number) {
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

    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.log("Error fetching print orders by customer id:", error);
    return null;
  }
}