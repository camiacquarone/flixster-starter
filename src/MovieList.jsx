import { useEffect, useState } from "react"; //don't forget to import 
import MovieCard from "./MovieCard";
import "./MovieList.css";
import Modal from "./Modal.jsx";
import "./Modal.css";

const API = import.meta.env.VITE_API_KEY;

// SearchBar component for searching movies
//export function because you can only have onen default per page 
export function SearchBar({ setResults, setIsSearching }) {
  const [input, setInput] = useState(""); // State for search input

  // Fetch movies from TMDb API based on search value
  const fetchData = (value) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${value}` //changed the API to have query at the end
    )
      .then((response) => response.json())
      .then((json) => {
        const results = json.results.filter((movie) => { //filter results to match the input (only need movie)
          return movie.title.toLowerCase().includes(value.toLowerCase()); //case insensitive 
        });
        setResults(results); //update the results state 
        setIsSearching(true); //set searching state to true 
        console.log(results); //helps for debugging in console 
      });
  };

  //when input state changes, calls this function 
  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  //it fetches the data when submit is clicked 
  //onSubmit allows the enter key to act as submit 
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(input);
  };

//calls on this function when click Clear button 
  const handleClearClick = () => {
    setInput("");
    setResults([]);
    setIsSearching(false);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <button type="submit" id="buttonSearch"> 
          Search
        </button> 
        <button type="button" id="buttonClear" onClick={handleClearClick}>
          Clear
        </button>
      </form>
    </div>
  );
}

// DropdownMenu component for sorting movies
//sets all the dropdown options 
export function DropdownMenu({ handleSort }) {
  return (
    <div className="SortButton">
      <select
        className="dropdown"
        onChange={(e) => handleSort(e.target.value)}
        defaultValue=""
      >
        <option value="now-playing">Now Playing</option>
        <option value="title">Title (A-Z)</option>
        <option value="release_date">Release Date (Newest)</option>
        <option value="vote_average">Rating (Highest)</option>
      </select>
    </div>
  );
}
// MovieList component to display movies
export function MovieList({ results, isSearching }) {
  const [movies, setMovies] = useState([]); //movie list state 
  const [loading, setLoading] = useState(true); //loading state
  const [pageNum, setPageNums] = useState(1); // page number state 
  const [openModal, setOpenModal] = useState(false); //modal open and close state 
  const [clickedMovie, setClickedMovie] = useState(null); //selected movie state 
  const [originalMovies, setOriginalMovies] = useState([]); //original movie list (now playing)

  // Fetch now playing movies from TMDb API when pageNum or isSearching is false 
  useEffect(() => {
    if (!isSearching) {
      const fetchAPI = async () => {
        try {
          const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API}&page=${pageNum}`;
          const response = await fetch(URL);
          const jsonData = await response.json();
          setMovies((prevMovies) =>
            pageNum === 1
              ? jsonData.results
              : [...prevMovies, ...jsonData.results]
          );
          if (pageNum === 1) {
            setOriginalMovies(jsonData.results); // Save original list for reset
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAPI();
    }
  }, [pageNum, isSearching]);

  //loading message 
  if (loading && !isSearching) {
    return <p>Loading...</p>;
  }

  //open modal 
  function handleCardClick(movie) {
    setClickedMovie(movie);
    setOpenModal(true);
  }

  //close modal
  function handleCloseModal() {
    setOpenModal(false);
    setClickedMovie(null);
  }

  function LoadButton() {
    setPageNums((prevPageNum) => prevPageNum + 1);
  }

//sorts movies 
//takes in a string of teh sortin option 
const handleSort = (sortOption) => {
  if (sortOption === "title") {
    const sorted = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    setMovies(sorted);
  } else if (sortOption === "release_date") {
    const sorted = [...movies].sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    setMovies(sorted);
  } else if (sortOption === "vote_average") {
    const sorted = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    setMovies(sorted);
  } else {
    // "Now Playing" selected
    setMovies(originalMovies);
  }
};

  return (
    <div>
      <DropdownMenu handleSort={handleSort} />
      <span className="box">
        {(isSearching ? results : movies).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </span>
      <button id="LoadButton" onClick={LoadButton}>
        Load More
      </button>
      {openModal && clickedMovie && (
        <Modal movie={clickedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
