import { useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import { MovieList, SearchBar, DropdownMenu } from "./MovieList";
import Modal from "./Modal.jsx"


const App = () => {

  const[results, setResults] = useState([])
  const[isSearching, setIsSearching] = useState(false);
   

  return (
    <>
      <header>
        <style> @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');</style>
        <h1> Flixster</h1>
        <div className="search"> <SearchBar setResults={setResults} setIsSearching={setIsSearching} /></div>
      </header>
      < DropdownMenu/>
      
      <main>
        <div className="App"> 
          <MovieList results={results} isSearching={isSearching}/>
        </div>
      </main>
      <footer> </footer>
    </>
  );
};

export default App;
