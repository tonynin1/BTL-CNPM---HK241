import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getAllUsers() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("users", {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          }
      })
      return response.data;
      
    } catch (error) {
      console.log("Error fetching all Users:", error);
      return null;
    }
  }

  export async function getAllPrinters() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("printer", {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          }
      })
      return response.data;
      
    } catch (error) {
      console.log("Error fetching all printer:", error);
      return null;
    }
  }

  export async function updatePrinter(printerID: number, updateData: any) {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.patch(`printer/update/${printerID}`,{
        status: updateData.status
      }, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      })
      .catch((error) => {
        // console.log("Error update printer:", error);
      })
      return response.data;
      
    } catch (error) {
      console.log("Error update printer:", error);
      return null;
    }
  }

  export async function deletePrinter(printerId  : number) {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.delete(`printer/delete/${printerId}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      })
      .catch((error) => {
        // console.log("Error delete printer:", error);
      })

      return response.data;
      
    } catch (error) {
      console.log("Error delete printer:", error);
      return null;
    }
  }

  export async function deleteStudent (userId: number) {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.delete(`users/delete/${userId}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      }).catch((error) => {
        // console.log("Error delete student:", error);
      });
      return response.data;
      
    } catch (error) {
      console.log("Error delete student:", error);
      return null;
    }
  }

  export async function deleteSPSO(userId: number) {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.delete(`users/delete/${userId}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      }).catch((error) => {
        // console.log("Error delete spso:", error);
      });
      return response.data;
      
    } catch (error) {
      console.log("Error delete spso:", error);
      return null;
    }
  }