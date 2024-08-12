import axios from 'axios';
import { options, POPULAR_MOVIE_API } from '../utils/constant';
import { getPopularMovies } from '../redux/movieSlice';
import { useDispatch } from 'react-redux';

const usePopulatMovies = async () => {
    try {
        const dispatch = useDispatch();
        const res = await axios.get(POPULAR_MOVIE_API, options);
        dispatch(getPopularMovies(res.data.results));
    } catch (error) {
        console.log(error);
    }

}

export default usePopulatMovies