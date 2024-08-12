import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-8 '>
            <h1 className='text-3xl m-4  font-semibold uppercase text-white '>{title}</h1>


            <div className=' flex overflow-x-auto no-scrollbar cursor-pointer '>
                <div className='carousel rounded-box'>
                    {
                        movies && movies.map((movie) => {
                            return (
                                <MovieCard key={movie.id} moviedetails={movie} id={movie.id} posterpath={movie.poster_path} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList