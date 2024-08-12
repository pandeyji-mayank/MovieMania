import axios from 'axios';
import { NOW_PLAYING_MOVIE_API, options, POPULAR_MOVIE_API, TOP_RATED_MOVIE_API } from '../utils/constant';
import { getTopRatedMovies } from '../redux/movieSlice';
import { useDispatch } from 'react-redux';


const useTopRatedMovies = async () => {
    try {
        const dispatch = useDispatch();
        const res = await axios.get(TOP_RATED_MOVIE_API, options);
        dispatch(getTopRatedMovies(res.data.results));
    } catch (error) {
        console.log(error);
    }
}

export default useTopRatedMovies