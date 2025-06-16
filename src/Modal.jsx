import { GENRE_MAP } from './utils/genreMap';
import './Modal.css';

function Modal({ movie, onClose }) {
  if (!movie) return null;

  const genreNames = movie.genre_ids?.map(id => GENRE_MAP[id]).filter(Boolean).join(", ");

  return (
    <div className="modalBackground" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="movie-title"><h1>{movie.title}</h1></div>
        <div className="movie-img">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: "200px" }} />
        </div>
        <div className="release-date"><p>Release Date: {movie.release_date}</p></div>
        <div className="overview"><p>{movie.overview}</p></div>
        <div className="genres"><p>Genres: {genreNames}</p></div>
        <button onClick={onClose}> Close</button>
      </div>
    </div>
  );
}

export default Modal;
