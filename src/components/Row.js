import React, { useState } from "react";
import "../styles/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
// import { SkeletonWrapper } from "react-skeletonify";
// import "react-skeletonify/dist/index.css";
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="8" rx="3" ry="3" width="150" height="80" /> 
  </ContentLoader>
)

const Row = ({ title, movies, isLarge, loading }) => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleMovieClick = (event, movie) => {
    event.preventDefault();
    setMovie(movie);

    if (trailerUrl) {
      setTrailerUrl("");
    }

    setShowModal(!showModal);
  };

  const handleViewClick = (event) => {
    event.preventDefault();
    navigate(`/movie/${movie.movie_id}`, { state: { movie } });
  };

  const handlePlayClick = (event) => {
    event.preventDefault();

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies === undefined || movies.length === 0 ? (
          //   <SkeletonWrapper loading={loading}>
          // <span>No Movies Foudn</span>
          //   </SkeletonWrapper>
          <MyLoader></MyLoader>
        ) : (
          movies.map((movie) => (
            // <SkeletonWrapper loading={loading}>
            <img
              key={movie.movie_id}
              className={`row_poster ${isLarge && "row_posterLarger"}`}
              src={isLarge ? movie.poster : movie.backdrop_poster}
              alt={movie.title}
              onClick={(event) => handleMovieClick(event, movie)}
            />
            // </SkeletonWrapper>
          ))
        )}
      </div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: "400",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      )}
      {showModal && (
        <div className="movie_options">
          <button
            className="movie_button"
            onClick={(event) => handlePlayClick(event)}
          >
            Play
          </button>
          <button
            className="movie_button"
            onClick={(event) => handleViewClick(event)}
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;
