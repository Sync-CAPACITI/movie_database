
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from './Pages/MovieDetails'
import Home from "./Pages/Home";

import "./App.css";



const App = () => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    </Router>
  );
};

export default App;