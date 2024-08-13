import axios from 'axios';
import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { options, SEARCH_MOVIE_API } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchMovieDetails } from '../redux/searchSlice';
import MovieList from './MovieList';
import toast from 'react-hot-toast';
const SearchMovie = () => {
    const [searchMovie, setsearchMovie] = useState('');
    const dispatch = useDispatch();
    const movieTitle = useSelector((state) => state.search.movieName);
    const movieList = useSelector((state) => state.search.searchedMovie);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setsearchMovie(e.target.value);
        const funct = async () => {
            setLoading(true);
            if (searchMovie.length > 0) {
                try {
                    const res = await axios.get(SEARCH_MOVIE_API + '?query=' + searchMovie, options);
                    console.log(res.data);
                    dispatch(setSearchMovieDetails({ searchmovie: searchMovie, movies: res.data.results }))
                } catch (error) {
                    console.log(error);
                }
            }
            setLoading(false);
        }
        funct();
        // setsearchMovie('');
    }

    return (
        <>
            <div className='text-white  flex flex-col items-center justify-center pt-[10%] w-[100%]'>
                <div className='w-[50%]'>
                    <div className='input input-bordered input-accent h-16 flex items-center justify-between shadow-md border-2 border-gray-200 rounded-lg bg-slate-800 mb-80 '>
                        <input value={searchMovie} onChange={handleSearch} className=' rounded-lg w-full outline-none text-lg p-2 ps-4 bg-transparent hover:shadow-lg' type="text" placeholder='search movies.....' />
                        <button
                            type='submit'
                            className={` ${loading ? 'cursor-progress' : ''} rounded-lg h-10  bg-red-800  flex items-center justify-center hover:bg-red-600 transition-all duration-200 min-w-32`}
                            onClick={handleSearch}
                        >
                            {loading && <span className="  loading loading-ring loading-md"></span>}
                            {
                                !loading &&
                                <>
                                    <IoSearchOutline color='white' size={24} />
                                    <span className='ps-1'>
                                        Search
                                    </span>
                                </>
                            }
                        </button>

                    </div>
                </div>
                <div className='w-[70%] -mt-32'>
                    {
                        movieTitle && (
                            <div className=' relative z-10'>
                                <MovieList title={movieTitle} movies={movieList} />
                            </div>
                        )
                    }
                </div>
            </div >

        </>

    )
}

export default SearchMovie;