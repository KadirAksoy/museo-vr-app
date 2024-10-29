import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/likes";

export const getLikesForTravel = async (
  travelId: number,
  token?: string
): Promise<number> => {
  try {
    const response = await axios.get<number>(
      `${API_BASE_URL}/travel/${travelId}/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
