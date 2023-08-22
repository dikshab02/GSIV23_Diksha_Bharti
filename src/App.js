import "./App.css";
import React from "react";
import MovieList from "./Components/MovieList";
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";
import MovieDetail from "./Components/MovieDetail";
import HomeIcon from "@mui/icons-material/Home";


function App() {

  const navigateToMovieList = () => {
    document.location =
      document.location.origin;
  };
  return (
    <div>
      <button className="home-button" onClick={navigateToMovieList}>  <HomeIcon /></button>
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="movieDetail" element={<MovieDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
