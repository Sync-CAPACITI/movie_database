
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from './Pages/MovieDetails'
import Home from "./Pages/Home";
import MovieVideo from "./Pages/MovieVideo";

import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/MovieVideo.jsx" element={<MovieVideo />} />
        </Routes>
    </Router>
  );
};

export default App;
