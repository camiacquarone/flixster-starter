import { useEffect, useState } from "react";
import { GENRE_MAP } from "./utils/genreMap";
import "./Modal.css";

function Modal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!movie?.id) return;
      const API = import.meta.env.VITE_API_KEY;
      try {
        const [trailerRes, detailsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API}`),
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API}`)
        ]);

        const trailerData = await trailerRes.json();
        const detailsData = await detailsRes.json();

        const trailer = trailerData.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailerKey(trailer ? trailer.key : null);
        setRuntime(detailsData.runtime);
      } catch (err) {
        setTrailerKey(null);
        setRuntime(null);
      }
    }
    fetchMovieDetails();
  }, [movie]);

  const genreNames = movie.genre_ids
    ?.map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .join(", ");

  return (
    <div className="modalBackground" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="movie-title">
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-img">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "200px" }}
          />
        </div>
        <p>
          <span className="bold-label">Release Date:</span> {movie.release_date}
        </p>
        <div className="genres">
          <p>
            <span className="bold-label">Genres:</span> {genreNames}
          </p>
        </div>
        <div className="overview">
          <p>
            <span className="bold-label">Overview:</span> {movie.overview}
          </p>
        </div>
        <div className="runtime">
          <p>
            <span className="bold-label">Runtime:</span> {runtime ? `${runtime} min` : "Loading..."}
          </p>
        </div>
        {trailerKey && (
          <div className="trailer-container" style={{ margin: "1rem 0" }}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

