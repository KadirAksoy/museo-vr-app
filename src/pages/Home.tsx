import React, { useState } from "react";
import { getAllTravel, getTravelsSortedByLikes } from "../api/travel";
import { TravelResponse } from "../api/travel";
import Travels from "../components/travel/Travels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
          console.log("Fetched most liked travels:", data);
        })
        .catch(() => {});
    } else {
      setError("No token provided");
    }
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 items-center">
        En çok beğenilen geziler
      </h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1500}
        transitionDuration={1000}
        arrows={false}
        className="text-3xl font-bold mb-4 items-center"
      >
        {travels.map((mostLikedTravel) => (
          <div style={{ margin: "0 10px" }} key={mostLikedTravel.id}>
            <Travels travel={mostLikedTravel} />
          </div>
        ))}
      </Carousel>

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
