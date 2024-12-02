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
      console.log(updateData.status);
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
      console.log(response.data); 
      return response.data;
      
    } catch (error) {
      console.log("Error update printer:", error);
      return null;
    }
  }