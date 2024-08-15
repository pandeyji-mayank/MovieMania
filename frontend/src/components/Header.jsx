import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { makeToggle, setFavouriteMovies, setToggle } from '../redux/movieSlice';
import { MdLocalMovies } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
const Header = () => {

    const user = useSelector((store) => store.app.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggle = useSelector((store) => store.movie.toggle)
    const logoutHandler = async () => {
        try {
            const res = await axios.get(API_ENDPOINT + 'logout', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem('user');
                dispatch(setUser(null))
                navigate('/');
            }
            else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const toggleHandler = () => {
        navigate('/browse');
        dispatch(setToggle())
    }

    const navigatetofav = () => {
        navigate('/fav', { state: { isFav: 1 } });
        // navigate('/show', { state: { movieId: id, moviedetails } });
    }
    const navigatetowatchlist = () => {
        navigate('/fav', { state: { isFav: 0 } });
    }
    const navigatetogenrepage = () => {
        navigate('/genre');
    }
    useEffect(() => {
        console.log(toggle);
    }, [toggle]);

    return (
        <div className='absolute  z-20 flex w-[100%] px-6 items-center justify-between  bg-gradient-to-b from-black'>

            <h1 className={`text-red-500 text-2xl font-extrabold focus-within tracking-widest duration-700 font-customNob animate-textTransform `}>movie mania</h1>
            {
                (user && <div className='flex items-center'>
                    <h1
                        className='text-lg font-medium text-white'
                    >
                        <div className='flex items-center  '>
                            <div className='flex items-center'>
                                <IoIosArrowDropdown className='' color='white' size={24} />
                                {user.fullName}
                            </div>
                            <div onClick={navigatetogenrepage} className='m-2 my-4  px-4  btn glass' ><CiBoxList /> Genre</div>
                            <div onClick={navigatetofav} className='m-2  px-4  btn glass' > <FaHeart /> Favourite</div>
                            <div onClick={navigatetowatchlist} className='m-2  px-4  btn glass' ><MdLocalMovies />  WatchList</div>
                            {/* <div className="dropdown opacity-85" >
                                <div tabIndex={0} role="button" className="btn m-1 text-white opacity-100">
                                    {user.fullName}
                                </div>
                                <div className='btn btn-outline'>
                                    Favourite
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li className='hover:opacity-100' onClick={navigatetofav} ><a>Favourites</a></li>
                                    <li className='hover:opacity-100' onClick={navigatetowatchlist} ><a>WatchList</a></li>
                                </ul>
                            </div> */}
                        </div>
                    </h1>
                    <div className='ml-4'>

                        <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2 my-2 rounded-md hover:scale-105 hover:bg-red-500 overflow-hidden transition-all duration-300 '>Logout</button>
                        <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 my-2 rounded-md ml-2 hover:scale-105 hover:bg-red-500 overflow-hidden transition-all duration-300'>{toggle ? 'Home' : 'Search Movie'}</button>
                    </div>
                </div>)
            }

        </div >
    )
}

export default Header