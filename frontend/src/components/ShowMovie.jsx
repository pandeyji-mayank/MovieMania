import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import VideoBackground from './VideoBackground';
import axios from 'axios';
import { options } from '../utils/constant';
import Header from './Header';
import VideoTitle from './VideoTitle';
import MovieList from './MovieList';


const ShowMovie = () => {
    const { state } = useLocation();
    const { movieId, moviedetails } = state;
    const navigate = useNavigate();
    const [suggestedMovie, setSuggetedMovie] = useState();
    useEffect(() => {
        const updateMovie = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, options);
                console.log(res);
                setSuggetedMovie(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }
        updateMovie();
    }, [state])
    return (
        <>
            <Header />
            <div className=''>
                {movieId && <div>
                    <VideoTitle title={moviedetails.title} overview={moviedetails.overview} movieId={moviedetails.id} />
                    <VideoBackground movieId={movieId} />
                </div>}
            </div>
            <div className='-mt-40 z-40 relative'>
                <MovieList title={'suggested movies'} movies={suggestedMovie} />
            </div>
        </>
    )
}

export default ShowMovie;