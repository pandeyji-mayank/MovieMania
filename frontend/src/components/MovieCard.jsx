import React from 'react'
import { BANNER_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { getMovieIdToDisplay } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ id, posterpath, moviedetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEvent = () => {
        dispatch(getMovieIdToDisplay(id));
        navigate('/show', { state: { movieId: id, moviedetails } });
    }
    return (<>
        {
            posterpath &&
            <div
                className=' gap-2 carousel-item w-52 pe-2 hover:scale-105 opacity-75 hover:opacity-100 rounded-md transition-all duration-300 flex items-center justify-center'
                onClick={handleEvent}
            >
                <span className="loading loading-ring loading-lg text-red-700"></span>
                <img src={BANNER_URL + posterpath} alt="Movie Banner" className='rounded-sm' />
            </div>
        }
    </>
    )
}

export default MovieCard