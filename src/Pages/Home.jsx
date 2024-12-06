import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import SearchIcon from "../search.svg";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch 12 random movies when the component mounts
    fetchRandomMovies();
  }, []);

  // Function to fetch random movies by combining categories and shuffling
  const fetchRandomMovies = async () => {
    const movieList = [];
    const categories = ["action", "comedy", "drama", "thriller", "romance"]; // Genres to fetch movies from

    // Fetch movies for each category and add them to the list
    for (let category of categories) {
      const response = await fetch(`${API_URL}&s=${category}`);
      const data = await response.json();
      if (data.Search) {
        movieList.push(...data.Search); // Add movies from this category
      }
    }

    // Shuffle the array of movies and slice the first 12
    const shuffledMovies = shuffleArray(movieList).slice(0, 12);
    setMovies(shuffledMovies);
  };

  // Function to shuffle an array (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    let shuffled = array.slice(); // Copy the array to avoid modifying the original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Search movies based on user input
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []); // Handle case when no movies are found
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
