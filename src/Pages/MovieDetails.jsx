import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`${API_URL}&i=${id}`);
    const data = await response.json();
    setMovieDetails(data);
  };

  if (!movieDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800">{movieDetails.Title}</h2>

          {/* Plot */}
          <p className="mt-4 text-gray-700">{movieDetails.Plot}</p>

          {/* Additional Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong className="block text-gray-600">Released:</strong>
              <span className="text-gray-800">{movieDetails.Released}</span>
            </div>
            <div>
              <strong className="block text-gray-600">Director:</strong>
              <span className="text-gray-800">{movieDetails.Director}</span>
            </div>
            <div>
              <strong className="block text-gray-600">Actors:</strong>
              <span className="text-gray-800">{movieDetails.Actors}</span>
            </div>
            <div>
              <strong className="block text-gray-600">IMDB Rating:</strong>
              <span className="text-gray-800">{movieDetails.imdbRating}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
