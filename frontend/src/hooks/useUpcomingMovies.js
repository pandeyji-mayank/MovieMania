import axios from 'axios';
import { options, UPCOMING_MOVIE_API } from '../utils/constant';
import { getNowPlayingMovies, getUpcomingMovies } from '../redux/movieSlice';
import { useDispatch } from 'react-redux';
const useNowPlayingmovies = async () => {
    try {
        const dispatch = useDispatch();
        const res = await axios.get(UPCOMING_MOVIE_API, options);
        dispatch(getUpcomingMovies(res.data.results));
    } catch (error) {
        console.log(error);
    }
}
export default useNowPlayingmovies;