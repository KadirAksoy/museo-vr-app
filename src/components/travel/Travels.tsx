import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TravelResponse, getImageAsBase64 } from "../../api/travel";

interface TravelProps {
  travel: TravelResponse;
}

const Travels: React.FC<TravelProps> = ({ travel }) => {
  const [image, setImage] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImage = async () => {
      if (token) {
        try {
          const base64Image = await getImageAsBase64(
            travel.travelImageResponse.id,
            token
          );
          setImage(base64Image);
        } catch (error) {
          console.error("Failed to fetch image:", error);
        }
      } else {
        console.error("No token provided");
      }
    };

    fetchImage();
  }, []);

  return (
    <Link to={`/travels/${travel.id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
        {image ? (
          <img
            className="w-full h-48 object-cover"
            src={`data:image/jpeg;base64,${image}`}
            alt={travel.travelImageResponse.name || "Travel Image"} // Hata kontrolü
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        <div className="px-6 py-4 flex-1">
          <div className="font-bold text-xl mb-2">{travel.title}</div>
          <p className="text-gray-700 text-base">{travel.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Travels;
