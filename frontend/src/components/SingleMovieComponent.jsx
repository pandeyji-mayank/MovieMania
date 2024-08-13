import React, { useEffect, useState } from 'react'
import { API_ENDPOINT, BANNER_URL, options } from '../utils/constant'
import { PiStarFill } from "react-icons/pi";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMovieIdToDisplay } from '../redux/movieSlice';

const SingleMovieComponent = ({ id, onRemove }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [movie, setmovie] = useState('');
    const [coverMovie, setcoverMovie] = useState()
    useEffect(() => {
        const getmoviedetails = async () => {
            try {
                if (id && (!movie || !coverMovie)) {
                    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
                    setmovie(res.data);
                    setcoverMovie(BANNER_URL + res.data.backdrop_path);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getmoviedetails();

    }, [movie, coverMovie])
    const removefromfav = async () => {
        try {
            const res = await axios.post(API_ENDPOINT + 'removefromfav', { movieId: id }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": true,
                },
                withCredentials: true,
            });
            toast.success('done');
            setmovie(null);
            onRemove(id);
            id = null;
        } catch (error) {
            console.log(error);
        }
    }
    const handleEvent = () => {
        console.log('aya');
        dispatch(getMovieIdToDisplay(id));
        navigate('/show', { state: { movieId: movie.id, moviedetails: movie } });
    }
    return (
        <>
            {
                movie && <div className="ease-in-out card card-side m-8 mb-12 hover:shadow-xl hover:shadow-slate-700 flex items-center justify-center  max-w-screen-xl indicator hover:scale-[101%] transition-all duration-700 " >
                    <span onClick={removefromfav} className="indicator-item indicator-top indicator-end badge badge-secondary cursor-pointer bg-red-600 border-none text-white p-4 font-extrabold"
                    >
                        X
                    </span>
                    <div>
                        <img className='h-[500px] rounded-tl-2xl' src={BANNER_URL + movie.poster_path} alt="Movie" />
                    </div>
                    {
                        coverMovie && <div
                            style={{
                                backgroundImage: `url(${coverMovie})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="h-[500px] card-body w-3/5 rounded-r-2xl relative flex items-center"
                        >
                            {/* <img src= ></img> */}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black opacity-75 rounded-r-2xl"></div>

                            {/* Text content */}
                            <div className="relative z-10 text-white mt-14">
                                <h2 className="card-title text-white text-3xl uppercase font-bold mb-4 cursor-pointer " onClick={handleEvent}>
                                    {movie.title}
                                </h2>
                                <div className='flex mt-5 '>
                                    <PiStarFill size="24px" className="text-yellow-500 me-1" />
                                    {movie.vote_average}
                                    <div className='ms-3'>
                                        {movie.runtime}M
                                    </div>
                                    <div className='ms-3'>
                                        {movie.release_date}
                                    </div>
                                </div>
                                <div className='mt-4 flex gap-2 font-semibold'>
                                    {
                                        movie.genres && movie.genres.map((item, i) => {
                                            return <div className='me-1'>{item.name}</div>;
                                        })
                                    }
                                </div>

                                <p className="text-lg mt-6">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>}
                </div >
            }
        </>
    )
}

export default SingleMovieComponent

