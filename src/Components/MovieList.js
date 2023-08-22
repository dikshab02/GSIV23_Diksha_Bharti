import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { PAGE_SIZE, allMovies_apiUrl } from "../Data/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MovieList = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let totalMovies = 0;
  let totalPages = 0;
  let [loading, setLoading] = useState(false);
  // let pageNumberArray = [];

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    setLoading(true);
    fetch(allMovies_apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        totalMovies = data.length;
        totalPages = Math.round(totalMovies / PAGE_SIZE);
        console.log("totalMovies",totalMovies,"totalPages",totalPages)
        const currentPageMovies = data.slice(
          pageNumber * PAGE_SIZE,
          pageNumber * PAGE_SIZE + PAGE_SIZE
        );
        setMovies(currentPageMovies);
        removeLoader();
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        removeLoader()
      });
  };

  const removeLoader = () => {
    setTimeout(() => { setLoading(false) }, 0)
  }

  const pageNumberPrev = () => {
    setPageNumber(pageNumber - 1);
    getAllMovies();
  }

  const pageNumberNext = () => {
    setPageNumber(pageNumber + 1);
    getAllMovies();
  }
 
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {
        loading === true && (<div className="loading-circle-container">
          <img src="loading-load.gif" className="loading-image-gif"></img>
        </div>)
      }
      
      <div className="form header-row">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search anything..."
          value={search}
          onChange={handleSearch}
        />
        { pageNumber > 0 && (
          <button className="arrow-button-left" onClick={pageNumberPrev}> <ArrowBackIcon /></button>
        )}
        
     {pageNumber + 1} 
        <button className="arrow-button-right" onClick={pageNumberNext}><ArrowForwardIcon /></button>
      </div>
      <div className="main-container">
        {movies
          .filter((movie) =>
            movie.original_title.toLowerCase().includes(search.toLowerCase())
          )
          .map((movie) => (
            <MovieCard movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
