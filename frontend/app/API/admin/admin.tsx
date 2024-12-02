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

  export async function createPrinter(model: string, brand: string, description: string, facility: string, building: string, room:string,  spsomemberId: string){
    try {
      const cookies = parseCookies();
      let accessToken = cookies.accessToken;
  
      if (!accessToken) {
        throw new Error("Access token not found.");
      }
      console.log(model, brand, description, facility, building, room, spsomemberId);
      const response = await api.post(`printer/create`, {
          model: model,
          brand: brand,
          description: description,
          facility: facility,
          building: building,
          room: room,
          spsomemberId: parseInt(spsomemberId, 10)
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      })
      .catch((error) => {
        console.log("Error create printer:", error);
      });
      console.log(response);
      return response.data;
      
    } catch (error) {
      console.log("Error create printer:", error);
      return null;
    }
  }