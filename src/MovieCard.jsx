import { useState } from "react";
import "./MovieCard.css";

function MovieCard(props) {
  const { movie, onClick } = props;
  const [liked, setLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation(); //prevents opening the modal
    setLiked((prev) => !prev);
  };

  return (
    <div className="MovieCard1" onClick={onClick}>
      <div className="poster-container">
        <span
          className={`heart-icon${liked ? " liked" : ""}`}
          onClick={handleHeartClick}
        >
          &#x2665;
        </span>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt="movie_poster"
          className="imgCard"
          onError={(e) => {
            e.target.src = "/default-movie.png";
          }}
        />
      </div>
      <h3>{movie?.title}</h3>
      <p className="vote-average">
        <img src="/star2.png" width="20px" />
        <span className="score">
          {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </span>
      </p>
        <select className="watch-dropdown" defaultValue="" onClick={handleHeartClick}>
          <option value="" disabled >Choose an option</option>
          <option value="now-playing">Want To Watch</option>
          <option value="title">Currently Watching</option>
          <option value="release_date">Watched</option>
        </select>
      </div>
  );
}

export default MovieCard;
