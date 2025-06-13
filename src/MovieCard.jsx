
function MovieCard(props){
    console.log(props)
    const {movie} = props
    return(
        <div className = "MovieCard">
            <h3> {movie?.title} </h3>
            <p> {movie?.poster_path} </p>
            <p> {movie?.vote_average}</p>
        </div>
    )
            
                
        
}; 

export default MovieCard;
        