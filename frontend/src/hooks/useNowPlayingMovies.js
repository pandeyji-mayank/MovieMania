import axios from 'axios';
import { NOW_PLAYING_MOVIE_API, options } from '../utils/constant';
import { getNowPlayingMovies } from '../redux/movieSlice';
import { useDispatch } from 'react-redux';
const useNowPlayingmovies = async () => {
    try {
        const dispatch = useDispatch();
        const res = await axios.get(NOW_PLAYING_MOVIE_API, options);
        dispatch(getNowPlayingMovies(res.data.results));
    } catch (error) {
        console.log(error);
    }
}
export default useNowPlayingmovies;