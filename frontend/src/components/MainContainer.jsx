import React, { useEffect, useState } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieIdToDisplay } from '../redux/movieSlice';

const MainContainer = () => {
    const movie = useSelector((store) => store?.movie?.nowPlayingMovies);
    if (!movie) return;// early return in react
    const val = Math.floor(Math.random() * (movie.length));
    const { overview, title } = movie[val];
    const id = movie[val].id;
    return (
        <div>
            <VideoTitle title={title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer