import { useEffect, useState } from "react";
import { BASE_URL_IMG, API_KEY } from "../Data/constants";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const urlArr = window.location.href.split("=");
  const rel_year = new Date(movieInfo.release_date);
  useEffect(() => {
    const movieCard_apiUrl = `https://api.themoviedb.org/3/movie/${urlArr[1]}?api_key=${API_KEY}`;

    fetch(movieCard_apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network response is not ok");
        return response.json();
      })
      .then((data) => {
        setMovieInfo(data);
      });
  }, []);


  return (
    <div>
      <div className="form header-row">Movie Details</div>
      <div className="main-detail">
        <div className="detail-img">
          <img
            className="card-img"
            alt="Movie"
            src={BASE_URL_IMG + movieInfo.poster_path}
          ></img>
        </div>
        <div className="container-img">
          <h5>{movieInfo.original_title}</h5>
          <div>{rel_year.getFullYear()}</div>
          <div>Description: {movieInfo.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
