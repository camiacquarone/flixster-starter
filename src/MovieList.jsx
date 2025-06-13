import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API = import.meta.env.VITE_API_KEY;
// const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API}`

function MovieList(){
    const[movies, setMovies] = useState([]) // movies = get movies 
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const fetchAPI = async() => {
            try{
                const response = await fetch(URL)

                // .then((response) => response.json()) //json text to js
                // .then((data) => setMovies[data.results]); 
                const jsonData = await response.json();
                console.log(jsonData)
                setMovies(jsonData.results)
                console.log(movies)
            }
            catch(err) {
                console.log(err)

            } finally {
                    setLoading(false)

                }
                
            }
        
        fetchAPI();


    }, []); 

    if (loading){
        return <p>Loading...</p>
    }

    return (
            <div> 
                {movies.map((movie) =>(
                    <MovieCard  key={movie.id} movie={movie}/>

                ))}; 
                

            </div>



    )

};

export default MovieList; 

    // .then((response) => {
    //   if (!response.ok) {
    //     //checks if response was not succesful
    //     throw new Error("Network error: " + response.status);
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   data.playlists.forEach(createPlaylistTile); //array playlists in data file - for each playlist it calls createPlaylistTitle
    // })
    // .catch((err) => {
    //   console.error("Failed to load playlists:", err);
    // });