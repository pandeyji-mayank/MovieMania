import React from 'react'


const MovieTile = ({ movie }) => {
    console.log(movie);
    return (
        <div>
            <div className="relative inline-block rounded-2xl ">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="block w-full h-auto rounded-md" />
                <div className="rounded-md absolute inset-0 bg-black bg-opacity-0 text-white flex items-center justify-center opacity-80 transition-opacity duration-300">
                    <div className='h-full w-full mt-32'>
                        <h2 className='text-2xl font-extrabold mx-5'>{movie.title}</h2>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieTile