import React, { useEffect, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PiStarFill } from "react-icons/pi";
import axios from "axios";
import { API_ENDPOINT, options } from '../utils/constant';
const VideoTitle = ({ title, overview, movieId }) => {
    const value = useSelector(store => store?.movie?.trailerMovie?.key);
    const [movie, setmovie] = useState('');
    const [redirect, setRedirect] = useState('https://www.youtube.com/embed/' + value ? value : 'xcJtL7QggTI' + '?si=n3tGEITKWHQddX_w');
    useEffect(() => {
        setRedirect('https://www.youtube.com/embed/' + value ? value : 'xcJtL7QggTI' + '?si=n3tGEITKWHQddX_w')
        const getmoviedetails = async () => {
            try {
                console.log('yaha aya');
                if (movieId) {
                    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
                    setmovie(res.data);
                }
            }
            catch (error) {
                console.log(error);
            }
            // console.log("movie data : ", movie);
        }
        getmoviedetails();
    }, [value, redirect, title, movieId])
    const handleClickfav = async () => {
        try {
            const res = await axios.post(API_ENDPOINT + 'addmovietofav', { movieId }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": true,
                },
                withCredentials: true,
            });
            toast.success(res.data.message);
            if (res.data.success) {
                toast(red.data.message)
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            else
                console.log(error);
        }
    }
    const handleClickwatch = async () => {
        try {
            const res = await axios.post(API_ENDPOINT + 'addwatchlist', { movieId }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": true,
                },
                withCredentials: true,
            });
            toast.success(res.data.message);
            if (res.data.success) {
                toast(red.data.message)
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            else
                console.log(error);
        }
    }

    return (<>
        {
            movie && <div className='z-10 w-[vw] ms-36 aspect-video absolute text-white pt-[15%] p-12'>
                <h1 className='text-3xl font-extrabold uppercase'>{movie.title}</h1>
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
                <div className='mt-4 flex  font-semibold'>
                    {
                        movie.genres && movie.genres.map((item, i) => {
                            return <div className='me-1'> {item.name} </div>;;
                        })
                    }
                </div>
                <p className='mb-10 w-3/6 mt-2' >{movie.overview}</p>
                <div className=' flex items-center mt-4 h-12'>
                    <button onClick={handleClickwatch}
                        className=' h-full flex items-center px-6 py-2 m- bg-white text-black rounded-md  opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-200' >
                        <CiPlay1 size="24px" />
                        <span className='ms-2'>
                            Add to Watchlist
                        </span>
                    </button>
                    <button onClick={handleClickfav} className=' h-full flex items-center px-6 py-2 m-3 bg-white text-black rounded-md opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-200'>
                        <BsInfoCircle size='24px' />
                        <span className='ms-2'>
                            Add to favourites
                        </span>
                    </button>
                </div>
            </div>
        }
    </>
    )
}

export default VideoTitle