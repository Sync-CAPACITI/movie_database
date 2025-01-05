import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './movieDetails.css';

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
      <div className="flex items-center justify-center h-screen bg-[#06130e]">
        <div className="text-lg font-medium text-gray-300">Loading...</div>
      </div>
    );
  }

  // Dummy actor images (Replace with actual images if available)
  const actorImages = {
    "Robert Downey Jr.": "https://via.placeholder.com/150",  // Replace with actual image URL
    "Chris Hemsworth": "https://via.placeholder.com/150",  // Replace with actual image URL
    "Scarlett Johansson": "https://via.placeholder.com/150",  // Replace with actual image URL
  };

  const actors = movieDetails.Actors.split(', ');

  return (
    <div className="min-h-screen bg-[#06130e] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white text-black shadow-lg rounded-lg overflow-hidden">
        {/* Hero Section */}
        <div className="hero-container">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="hero-image"
          />
          <div className="hero-text">
            {/* Title */}
            <h2 className="hero-title">{movieDetails.Title}</h2>

            {/* Plot */}
            <p className="hero-description">{movieDetails.Plot}</p>

            {/* Additional Details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <strong className="block text-gray-400">Released:</strong>
                <span className="text-gray-300">{movieDetails.Released}</span>
              </div>
              <div>
                <strong className="block text-gray-400">Director:</strong>
                <span className="text-gray-300">{movieDetails.Director}</span>
              </div>
              <div>
                <strong className="block text-gray-400">Actors:</strong>
                <span className="text-gray-300">{movieDetails.Actors}</span>
              </div>
              <div>
                <strong className="block text-gray-400">IMDB Rating:</strong>
                <span className="text-gray-300">{movieDetails.imdbRating}/10</span>
              </div>
            </div>

            {/* Cast Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[#06130e]">Cast</h3>
              <div className="flex flex-wrap gap-6 mt-4">
                {actors.map((actor, index) => (
                  <div key={index} className="actor-card">

                    <div className="actor-name text-center">{actor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
