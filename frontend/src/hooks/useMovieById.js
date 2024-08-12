import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getTrailer } from '../redux/movieSlice';
import { useEffect } from "react";



const useMovieById = async (movieId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getMovieById = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
                const trailer = res?.data?.results?.filter((item) => {
                    return item.type === "Trailer";
                })
                const value = (trailer.length > 0 ? trailer[0] : res?.data?.results[0])
                if (value)
                    dispatch(getTrailer(value));
            } catch (error) {
                console.log(error);
            }
        }
        getMovieById();
    }, [movieId, dispatch])
}

export default useMovieById;