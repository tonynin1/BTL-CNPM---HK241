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

  export async function getAllSpso() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("spsomember", {
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