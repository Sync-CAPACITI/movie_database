// MovieDetails.js
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

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h2>{movieDetails.Title}</h2>
      <p>{movieDetails.Plot}</p>
      <img src={movieDetails.Poster} alt={movieDetails.Title} />
      <div>
        <strong>Released:</strong> {movieDetails.Released}
      </div>
      <div>
        <strong>Director:</strong> {movieDetails.Director}
      </div>
      <div>
        <strong>Actors:</strong> {movieDetails.Actors}
      </div>
      <div>
        <strong>IMDB Rating:</strong> {movieDetails.imdbRating}
      </div>
      {/* You can add more details here */}
    </div>
  );
};

export default MovieDetails;
