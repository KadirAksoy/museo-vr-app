import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TravelDetailsResponse,
  getTravelById,
  getImageAsBase64,
} from "../api/travel";

const TravelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<TravelDetailsResponse | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentImageContent, setCurrentImageContent] = useState<string | null>(
    null
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && id) {
      getTravelById(Number(id), token)
        .then((data) => {
          console.log("Fetched travel details:", data);
          setTravel(data);
          fetchImageContent(data.travelImageResponses[0].id);
        })
        .catch((error) => {
          console.error("Failed to fetch travel details:", error);
          setTravel(null);
        });
    }
  }, []);

  const fetchImageContent = async (imageId: number) => {
    try {
      if (token) {
        const base64Image = await getImageAsBase64(imageId, token);
        setCurrentImageContent(base64Image);
      }
    } catch (error) {
      console.error("Failed to fetch image content:", error);
    }
  };

  const handleNextImage = () => {
    const nextIndex =
      (currentImageIndex + 1) % travel!.travelImageResponses.length;
    setCurrentImageIndex(nextIndex);
    fetchImageContent(travel!.travelImageResponses[nextIndex].id);
  };

  const handlePrevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + travel!.travelImageResponses.length) %
      travel!.travelImageResponses.length;
    setCurrentImageIndex(prevIndex);
    fetchImageContent(travel!.travelImageResponses[prevIndex].id);
  };

  if (!travel || currentImageContent === null) return <p>Loading...</p>;

  const currentImage = travel.travelImageResponses[currentImageIndex];

  return (
    <div className="container mx-auto p-4 flex">
      <div className="flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {travel.travelResponse.title}
          </h1>
          <p className="text-gray-700 text-base">
            {travel.travelResponse.description}
          </p>
        </div>
        <div
          className="flex bg-white overflow-hidden"
          style={{ width: "1400px", height: "600px" }}
        >
          <div className="flex items-center justify-between p-2 w-1/2">
            <button
              onClick={handlePrevImage}
              className="bg-slate-200 text-black px-3 py-1 rounded-l mr-2 hover:bg-slate-300"
            >
              ←
            </button>
            <div className="flex-grow flex justify-center items-center relative">
              <img
                className="w-full h-96 object-cover" // Adjust the width and height here
                src={`data:image/jpeg;base64,${currentImageContent}`}
                alt={currentImage.name}
              />
            </div>
            <button
              onClick={handleNextImage}
              className="bg-slate-200 text-black px-3 py-1 rounded-r ml-2 hover:bg-slate-300"
            >
              →
            </button>
          </div>
          <div className="p-4 flex items-start ml-5 mt-2 ">
            <p className="text-gray-700 text-base">{currentImage.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;
