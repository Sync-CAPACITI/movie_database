import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import SearchIcon from "../search.svg";
import "./showMore.css";
import Spinner from 'react-bootstrap/Spinner';

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";
// const TMDB_API_URL = "https://api.themoviedb.org/3/movie"; // TMDb base URL
// const TMDB_API_KEY = "ae2811c3ea592e3bbde21d9e7443eb6a"; // Replace with your TMDb API key

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("random");
  const [activeCategory, setActiveCategory] = useState("random");
  const [activeGenre, setActiveGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moviesByCategory, setMoviesByCategory] = useState({});


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
  }, [category, activeGenre, currentPage]);

  const fetchRandomMovies = async () => {
    setLoading(true);
    const movieList = [];
    const categories = ["action", "comedy", "drama", "thriller", "romance"];

    for (let category of categories) {
      const response = await fetch(`${API_URL}&s=${category}&page=${currentPage}`);
      const data = await response.json();
      if (data.Search) {
        movieList.push(...data.Search);
      }
    }

    const shuffledMovies = shuffleArray(movieList).slice(0, 12 * currentPage);
    setMovies(shuffledMovies);
    setLoading(false);
  };

  const fetchMoviesByGenre = async (category, genre) => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${genre}&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  const fetchLatestMovies = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=movie&y=2024&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  const fetchLatestTVSeries = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=tv&y=2024&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  const fetchTrendingMovies = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}&s=movie&sort=year&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
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
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  // Set category and active genre
  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
    setActiveGenre(null);
    setCurrentPage(1);
  };

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
    fetchMoviesByGenre(category, genre);
    setCurrentPage(1);
  };

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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

      {movies?.length > 0 ? ( // if the movies are retrived from the API 
        <div className="container">
          {
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          }
        </div>
      ) :

        (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }

      <div className="movies-container">
        {Object.keys(moviesByCategory).map((category) => {
          const movies = moviesByCategory[category];
          if (movies.length === 0) return null;

          return (
            <div key={category} className="category-group">
              <h2 className="category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className="movie-list">
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Show More Button */}
      {/* Show the "Show More" button only if there are movies */}
      {movies?.length > 0 && (
        <div className="show-more-btn">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
