import { useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import MovieList from "./MovieList.jsx";


const App = () => {
  return (
    <>
      <header>
        <h1 className="FlixsterHeading"> Flixster</h1>
      </header>
      <main>
        <div className="App">
          <MovieCard />
          <MovieList />
        </div>
      </main>
    </>
  );
};

export default App;
