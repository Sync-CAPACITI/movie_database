import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import SearchIcon from "../search.svg";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("random");
  const [activeCategory, setActiveCategory] = useState("random");
  const [activeGenre, setActiveGenre] = useState(null); // Track active genre

  useEffect(() => {
    if (category === "random") {
      fetchRandomMovies();
    } else if (category === "latestMovies") {
      fetchLatestMovies();
    } else if (category === "latestTV") {
      fetchLatestTVSeries();
    } else if (category === "trending") {
      fetchTrendingMovies();
    } else {
      // Fetch movies based on selected genre and active category
      fetchMoviesByGenre(category, activeGenre);
    }
  }, [category, activeGenre]);

  const fetchRandomMovies = async () => {
    const movieList = [];
    const categories = ["action", "comedy", "drama", "thriller", "romance"];

    for (let category of categories) {
      const response = await fetch(`${API_URL}&s=${category}`);
      const data = await response.json();
      if (data.Search) {
        movieList.push(...data.Search);
      }
    }

    const shuffledMovies = shuffleArray(movieList).slice(0, 12);
    setMovies(shuffledMovies);
  };

  const fetchMoviesByGenre = async (category, genre) => {
    const response = await fetch(`${API_URL}&s=${genre}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchLatestMovies = async () => {
    const response = await fetch(`${API_URL}&s=movie&y=2024`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchLatestTVSeries = async () => {
    const response = await fetch(`${API_URL}&s=tv&y=2024`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchTrendingMovies = async () => {
    const response = await fetch(`${API_URL}&s=movie&sort=year`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  // Set category and active genre
  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
    setActiveGenre(null); // Reset the genre when category changes
  };

  const handleGenreClick = (genre) => {
    setActiveGenre(genre); // Set the active genre
    fetchMoviesByGenre(category, genre); // Fetch movies based on selected genre
  };

  return (
    <div className="app">
      <h1>Movies Reel</h1>

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

      <div className="category-buttons">
        <button
          onClick={() => handleCategoryClick("trending")}
          className={activeCategory === "trending" ? "active" : ""}
        >
          Trending Movies
        </button>
        <button
          onClick={() => handleCategoryClick("latestMovies")}
          className={activeCategory === "latestMovies" ? "active" : ""}
        >
          Latest Movies
        </button>
        <button
          onClick={() => handleCategoryClick("latestTV")}
          className={activeCategory === "latestTV" ? "active" : ""}
        >
          Latest TV Series
        </button>
        <button
          onClick={() => handleCategoryClick("random")}
          className={activeCategory === "random" ? "active" : ""}
        >
          Random Movies
        </button>
      </div>

      {/* Genre Buttons: Show these only if category is active */}
      {(activeCategory === "trending" || activeCategory === "random") && (
        <div className="genre-buttons">
          <button
            onClick={() => handleGenreClick("action")}
            className={activeGenre === "action" ? "active" : ""}
          >
            Action
          </button>
          <button
            onClick={() => handleGenreClick("comedy")}
            className={activeGenre === "comedy" ? "active" : ""}
          >
            Comedy
          </button>
          <button
            onClick={() => handleGenreClick("drama")}
            className={activeGenre === "drama" ? "active" : ""}
          >
            Drama
          </button>
          <button
            onClick={() => handleGenreClick("thriller")}
            className={activeGenre === "thriller" ? "active" : ""}
          >
            Thriller
          </button>
          <button
            onClick={() => handleGenreClick("romance")}
            className={activeGenre === "romance" ? "active" : ""}
          >
            Romance
          </button>
        </div>
      )}

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