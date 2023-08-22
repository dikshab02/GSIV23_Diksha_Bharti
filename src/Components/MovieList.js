import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import {
  PAGE_SIZE,
  allMovies_apiUrl,
  BASE_URL_SEARCH,
  API_KEY,
} from "../Data/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MovieList = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const search_apiUrl = `${BASE_URL_SEARCH}?api_key=${API_KEY}&query=`;
  let totalMovies = 0;
  let totalPages = 0;

  useEffect(() => {
    getAllMovies();
  }, [pageNumber]);

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
        const currentPageMovies = data.slice(
          pageNumber * PAGE_SIZE,
          pageNumber * PAGE_SIZE + PAGE_SIZE
        );
        setMovies(currentPageMovies);
        removeLoader();
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        removeLoader();
      });
  };

  const removeLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  };

  const pageNumberPrev = () => {
    setPageNumber(pageNumber - 1);
    getAllMovies();
  };

  const pageNumberNext = () => {
    setPageNumber(pageNumber + 1);
    getAllMovies();
  };

  const searchCall = () => {
    if (!search) { // to handle empty search
      getAllMovies();
      return;
    }
    const searchvalue = search.replace(' ', '+')
    const newURL = search_apiUrl + searchvalue;
    fetch(newURL)
    .then((response)=> {
      if (!response.ok) throw new Error("Network response is not ok");
      return response.json();
    })
    .then((data)=> {
      setMovies(data.results)
    })
  }

  const handleSearch = (e) => {
    if(e.charCode === 32 || e.charCode === 13){
       searchCall();
    }
    // setSearch(e.target.value);
  };

  return (
    <div>
      {loading === true && (
        <div className="loading-circle-container">
          <img src="loading-load.gif" className="loading-image-gif"></img>
        </div>
      )}

      <div className="form header-row">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearch}
        />
        {pageNumber > 0 && (
          <button className="arrow-button-left" onClick={pageNumberPrev}>
            {" "}
            <ArrowBackIcon />
          </button>
        )}

        <div className="page-number">{pageNumber + 1}</div>
        <button className="arrow-button-right" onClick={pageNumberNext}>
          <ArrowForwardIcon />
        </button>
      </div>
      <div className="main-container">
        {movies
          .map((movie) => (
            <MovieCard movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
