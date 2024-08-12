import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const MovieContainer = () => {
    const movie = useSelector((store) => store.movie);
    return (
        <div className=' text-white' >
            {
                movie &&
                <div className='-mt-96 relative z-10'>
                    <MovieList title={"Popular Movies"} movies={movie.popularMovie} />
                    <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies} />
                    <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovie} />
                    <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovie} />
                </div>
            }
        </div>
    )
}

export default MovieContainer