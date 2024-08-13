import React, { useEffect, useState } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieIdToDisplay } from '../redux/movieSlice';

const MainContainer = () => {
    const movie = useSelector((store) => store?.movie?.nowPlayingMovies);
    let cnt = 0;
    useEffect(() => {
        if (movie)
            console.log(movie[0]);
    }, [movie])
    if (!movie) return; // early return in react
    const val = Math.floor(Math.random() * (movie.length));
    const { overview, title, id } = movie[val];
    return (
        <>
            <div>
                <VideoTitle title={title} overview={overview} movieId={id} />
                <VideoBackground movieId={id} />
            </div>
        </>
    )
}

export default MainContainer