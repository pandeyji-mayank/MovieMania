import React, { useEffect, useState } from 'react'
import Header from './Header'
import SingleMovieComponent from './SingleMovieComponent'
import axios from 'axios';
import { API_ENDPOINT } from '../utils/constant';
import { useLocation } from 'react-router-dom';
const FavMovie = () => {
    const [movie, setMovie] = useState();
    const { state } = useLocation();

    useEffect(() => {
        const getmovies = async () => {
            console.log(state);
            try {
                const api = API_ENDPOINT + (state.isFav ? 'getmovie' : 'watchlist');
                console.log(api);
                const movies = await axios.get(api, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setMovie(movies.data.data.reverse())
            } catch (error) {
                console.log(error);
            }
        }
        getmovies();
    }, [state.isFav])
    const handleRemove = (id) => {
        console.log('yaha aya');
        setMovie(movie => movie.filter(movie => movie !== id));
    };
    return (
        <div>
            <div>
                <Header />
            </div>
            {
                movie && movie.length > 0 ? (<div className='bg-gradient-to-l from-slate-800 from-50% via-zinc-900  to-black absolute min-h-screen min-w-full ' >
                    {/* <div className='bg-black ' > */}
                    <div className='pt-32 w-4/6 mx-auto flex flex-col items-center justify-center'>
                        {
                            movie && movie.map((item, ind) => (
                                <SingleMovieComponent key={ind} isFav={state.isFav} id={item} onRemove={handleRemove} />
                            ))
                        }
                    </div>
                </div>) : (<div className='w-screen h-screen flex items-center justify-center'>
                    <h1 className='text-white text-6xl   '>No Movies to Display in {state.isFav ? 'Favorites' : 'WatchList'}</h1>
                </div>)
            }
        </div>
    )
}

export default FavMovie