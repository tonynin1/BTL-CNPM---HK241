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

export async function updatePendingRequest(printOrderId: number, attributes : string) {
  try {
    console.log(printOrderId)
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.put(`print-history/request/${printOrderId}`, 
      {
        attributes: attributes
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating pending request:", error);
    return null;
    
  }
}

export async function deletePendingRequest(printOrderId: number) {
  try {
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.delete(`print-history/request/delete/${printOrderId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return response.data;
    
  } catch (error) {
    console.log("Error deleting pending request:", error);
    return null;
  }
}