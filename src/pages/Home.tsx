import React, { useState } from "react";
import { getAllTravel, getTravelsSortedByLikes } from "../api/travel";
import { TravelResponse } from "../api/travel"; // If the interface is separate, import it
import Travels from "../components/travel/Travels";

function Home() {
  const [travels, setTravels] = useState<TravelResponse[]>([]);
  const [mostLikedTravels, setMostLikedTravels] = useState<TravelResponse[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      getAllTravel(token)
        .then((data) => {
          console.log("Fetched travels:", data);
          setTravels(data);
        })
        .catch(() => {
          setError("Failed to fetch travels");
        });
    } else {
      setError("No token provided");
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      getTravelsSortedByLikes(token)
        .then((data) => {
          setMostLikedTravels(data);
        })
        .catch(() => {
          setError("Failed to fetch travels");
        });
    } else {
      setError("No token provided");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 items-center">
        En çok beğenilen geziler
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mostLikedTravels.map((mostLikedTravel) => (
          <Travels key={mostLikedTravel.id} travel={mostLikedTravel} />
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-4 mt-4 items-center">Geziler</h1>
      {error && <div>{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {travels.map((travel) => (
          <Travels key={travel.id} travel={travel} />
        ))}
      </div>
    </div>
  );
}

export default Home;
