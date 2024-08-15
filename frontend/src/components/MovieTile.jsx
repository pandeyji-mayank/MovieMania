import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { options } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMovieIdToDisplay } from '../redux/movieSlice';

const MovieTile = ({ movieId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movie, setMovie] = useState('');
    useEffect(() => {
        const loadmoviebyAPI = async (req, res) => {
            try {
                const res = await axios.get('https://api.themoviedb.org/3/movie/' + movieId, options);
                setMovie(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadmoviebyAPI();
    }, [movieId])
    const handleEvent = () => {
        dispatch(getMovieIdToDisplay(movie.id));
        navigate('/show', { state: { movieId: movie.id, moviedetails: movie } });
    }
    return (
        <div>
            {
                movie ?
                    (<div onClick={handleEvent} className="cursor-pointer relative inline-block rounded-2xl hover:scale-[102%] shadow-md hover:shadow-2xl shadow-black transition-all duration-500">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="block w-full h-auto rounded-md" />
                        <div className="rounded-md absolute inset-0 bg-black bg-opacity-100 opacity-0  text-white flex items-center justify-center hover:opacity-80 transition-opacity duration-300">
                            <div className='h-full w-full mt-32'>
                                <div className='mx-8 my-5'>
                                    <h2 className='text-2xl font-extrabold'>{movie.title}</h2>
                                    <div className='flex  '>
                                        {movie.genres.map((item) => <div key={item.id} className='mx-1 my-2 font-semibold' >{item.name} </div>)}
                                    </div>
                                    <p className='py-4'>{movie.overview.length > 200 ? movie.overview + '...' : movie.overview}</p>
                                </div>

                            </div>
                        </div>
                    </div>) : <div className='my-44 flex justify-center items-center '  >
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
            }
        </div>
    )
}
export default MovieTile