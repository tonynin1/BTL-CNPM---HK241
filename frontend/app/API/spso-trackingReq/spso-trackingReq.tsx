import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllPrintersByThisSPSO(spsoMemberId: number) {
    // http://localhost:8080/printer/spsoMemberId/:spsoMemberId
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
        console.log("Error fetching all printers by this SPSO:", error);
        return null;
        
    }
} 

export async function getAllPendingRequestByPrinterId(printerId: number) {
  try {
    // http://localhost:8080/print-history/request/printer/:printerId 
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await api.get(`print-history/request/printer/${printerId}`, {
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

export async function triggerPending(printOrderId: number) {
    // http://localhost:8080/print-history/request/:printOrderId
    try {
        const cookies = parseCookies();
        let accessToken = cookies.accessToken;

        if (!accessToken) {
            throw new Error("Access token not found.");
        }

        // if poStatus is "Pending", change to "Completed"
        // if poStatus is "Completed", change to "Pending"

        const find = await api.get(`print-history/request/printOrderId/${printOrderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(find.data.data.poStatus);
        let Status = find.data.data.poStatus;
        if (Status === "Pending") {
            const response = await api.put(`print-history/request/${printOrderId}`,
                {
                    poStatus: "Completed"
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } else {
            const response = await api.put(`print-history/request/${printOrderId}`,
                {
                    poStatus: "Pending"
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        }
    } catch (error) {
        console.log("Error updating pending request:", error);
        return null;
        
    }
}
