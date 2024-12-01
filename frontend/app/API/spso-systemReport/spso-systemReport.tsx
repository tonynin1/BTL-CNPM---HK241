import { parseCookies } from "nookies";
import api from "../axiosInstance";

export async function getSumStudents() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("customer/sum", {
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

  export async function getSumSpso() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("spsomember/sum", {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          }
      })
      return response.data;
      
    } catch (error) {
      console.log("Error fetching all spso:", error);
      return null;
    }
  }

export async function getSumPrintedPage() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("print-history/request/count/sum", {
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