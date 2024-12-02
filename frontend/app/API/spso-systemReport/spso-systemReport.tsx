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

  export async function getStudentByID(userId: number) {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get(`customer/userId/?userId=${userId}`, {
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
  // export async function getAllFeedbacks() {
  //   try {
  //     const cookies = parseCookies();
  //     let accessToken = cookies.accessToken;
  
  //     if (!accessToken) {
  //       throw new Error("Access token not found.");
  //     }
  
  //     const response = await api.get("feedback", {
  //         headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //         }
  //     })
  //     return response.data;
      
  //   } catch (error) {
  //     console.log("Error fetching all students:", error);
  //     return null;
  //   }
  // }

  export async function getAllFeedbacks() {
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
  
      const response = await api.get("feedback/all", {
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