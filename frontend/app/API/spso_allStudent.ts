import api from "./axiosInstance";
export async function getAllStudents() {
  try {
    const response = await api.get("/customer");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}
