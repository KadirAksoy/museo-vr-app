import React, { useEffect, useState } from "react";
import { getLikesForTravel } from "../../api/like"; // Adjust the import path as necessary

interface LikeIconProps {
  travelId: number;
}

const LikeIcon: React.FC<LikeIconProps> = ({ travelId }) => {
  const [likes, setLikes] = useState<number>(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (token) {
          const likesResponse: number = await getLikesForTravel(
            travelId,
            token
          );
          setLikes(likesResponse);
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, []);
  return (
    <div className="flex items-center">
      <span className="material-icons">favorite</span>{" "}
      <span className="ml-1">{likes}</span>
    </div>
  );
};

export default LikeIcon;
