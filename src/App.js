
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from './Pages/MovieDetails';
import WatchHistory from "./Pages/watchHistory";
import  NavBarMenu from "./Pages/NavbarMenu";
import Home from "./Pages/Home";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  return (  
    <Router>
          <NavBarMenu /> 
          <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watch-history" component={WatchHistory} />
        </Routes>
        </div>
    </Router>
  );
};

export default App;
