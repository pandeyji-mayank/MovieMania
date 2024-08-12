import React, { useEffect } from 'react'
import useMovieById from '../hooks/useMovieById'
import { useDispatch, useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {

    const dispatch = useDispatch();
    const trailer = useSelector((store) => store.movie.trailerMovie);
    const val = useSelector(store => store.movie.movieIdToDisplay);
    console.log(movieId);
    useMovieById(movieId);
    return (
        <div className='w-screen'>
            <iframe
                className='w-screen aspect-video opacity-70 -z-10 bg-zinc-900'
                src={`https://www.youtube.com/embed/${trailer.key ? trailer.key : 'xcJtL7QggTI'}?si=n3tGEITKWHQddX_w&autoplay=1&mute=true&controls=0&rel=0&modestbranding=1&loop=1&playlist=${trailer.key ? trailer.key : 'xcJtL7QggTI'}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    )

}

export default VideoBackground;

// <iframe width="560" height="315" src="https://www.youtube.com/embed/xcJtL7QggTI?si=n3tGEITKWHQddX_w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>