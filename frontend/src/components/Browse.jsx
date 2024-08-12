import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MovieContainer from './MovieContainer';
import MainContainer from './MainContainer';
import useNowPlayingmovies from '../hooks/useNowPlayingMovies';
import usePopulatMovies from '../hooks/usePopulatMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';


const Browse = () => {
    const navigate = useNavigate();
    const toggle = useSelector((store) => store.movie.toggle);
    // my curstom hooks
    useNowPlayingmovies();
    usePopulatMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    const user = useSelector((store) => store.app.user);
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    return (
        <div>
            <Header />
            <div className=''>
                {
                    toggle ? <SearchMovie /> : <>
                        <MainContainer />
                        <MovieContainer className='' />
                    </>
                }
            </div>

        </div>
    )
}

export default Browse