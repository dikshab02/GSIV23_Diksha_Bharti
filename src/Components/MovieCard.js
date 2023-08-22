import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import { BASE_URL_IMG, API_KEY } from '../Data/constants';

const MovieCard = ({ movie }) => {
  const [movieInfo, setMovieInfo] = useState({});
  useEffect(() => {
    const movieCard_apiUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`;

    fetch(movieCard_apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network response is not ok");
        return response.json();
      })
      .then((data) => {
        setMovieInfo(data);
      });
  }, [movie]);

  const navigateToMovieDetail = () => {
    document.location =
      document.location.origin + "/movieDetail?id=" + movie.id;
  };

  return (
    <div
      key={movie.id}
      className="card"
      onClick={() => navigateToMovieDetail()}
    >
      <img
        className="card-img"
        alt="Movie"
        src={BASE_URL_IMG + movieInfo.poster_path}
      ></img>
      <div className="container">
        <h7 className="movie-title">{movie.original_title}</h7>
        <p className="movie-overview">{movieInfo.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
