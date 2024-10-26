import axios from "axios";

export interface TravelResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  travelImageResponse: TravelImageResponse;
}

interface TravelImageResponse {
  id: number;
  name: string;
  type: string;
  content: string;
}

export interface TravelDetailsResponse {
  travelResponse: TravelResponse;
  travelImageResponses: TravelImageResponse[];
}
export interface TravelRequest {
  title: string;
  description: string;
  travelImageRequest: TravelImageRequest;
}
interface TravelImageRequest {
  content: string;
}

const API_BASE_URL = "http://localhost:8080/api/travel";

// Tüm seyahatleri getir
export const getAllTravel = async (
  token?: string
): Promise<TravelResponse[]> => {
  try {
    const response = await axios.get<TravelResponse[]>(`${API_BASE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seyahatleri beğenilere göre sırala
export const getTravelsSortedByLikes = async (
  token?: string
): Promise<TravelResponse[]> => {
  try {
    const response = await axios.get<TravelResponse[]>(
      `${API_BASE_URL}/sorted/likes`,
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

// Seyahat oluştur
export const createTravel = async (
  travelRequest: any,
  file: File,
  token?: string
): Promise<TravelResponse> => {
  const formData = new FormData();
  formData.append("travelRequest", JSON.stringify(travelRequest));
  formData.append("file", file);

  try {
    const response = await axios.post<TravelResponse>(
      `${API_BASE_URL}/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seyahati güncelle
export const updateTravel = async (
  id: number,
  travelRequest: any,
  file?: File,
  token?: string
): Promise<TravelResponse> => {
  const formData = new FormData();
  formData.append("travelRequest", JSON.stringify(travelRequest));
  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await axios.put<TravelResponse>(
      `${API_BASE_URL}/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seyahati sil
export const deleteTravel = async (
  id: number,
  token?: string
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

// Seyahate resim ekle
export const addImageToTravel = async (
  travelId: number,
  image: File,
  content: any,
  token?: string
): Promise<TravelResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("content", JSON.stringify(content));

  try {
    const response = await axios.post<TravelResponse>(
      `${API_BASE_URL}/${travelId}/add-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seyahatten resim sil
export const deleteImageFromTravel = async (
  travelId: number,
  imageId: number,
  token?: string
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${travelId}/delete-image/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

// Seyahat resmini güncelle
export const updateImageToTravel = async (
  travelId: number,
  imageId: number,
  image: File,
  content: any,
  token?: string
): Promise<TravelResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("content", JSON.stringify(content));

  try {
    const response = await axios.put<TravelResponse>(
      `${API_BASE_URL}/${travelId}/update-image/${imageId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Resmi Base64 formatında al
export const getImageAsBase64 = async (
  id: number,
  token?: string
): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}-images/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTravelsByUserId = async (
  userId: number,
  token?: string
): Promise<TravelResponse[]> => {
  try {
    const response = await axios.get<TravelResponse[]>(
      `${API_BASE_URL}/user/${userId}`,
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

export const getMyTravels = async (
  token?: string
): Promise<TravelResponse[]> => {
  try {
    const response = await axios.get<TravelResponse[]>(
      `${API_BASE_URL}/my-travels`,
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

// Seyahati ID'sine göre getir
export const getTravelById = async (
  id: number,
  token?: string
): Promise<TravelDetailsResponse> => {
  try {
    const response = await axios.get<TravelDetailsResponse>(
      `${API_BASE_URL}/${id}`,
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
