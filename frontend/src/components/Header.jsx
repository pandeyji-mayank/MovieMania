import axios from 'axios';
import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { makeToggle, setToggle } from '../redux/movieSlice';
import mayankflix from '../mayankflix.png'
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
    const toggleHandlerbylogo = () => {
        dispatch(makeToggle);
        navigate('/browse');
    }

    return (
        <div className='absolute  z-20 flex w-[100%] px-6 items-center justify-between  bg-gradient-to-b from-black'>
            <img className=' z-30 w-56 mt-2 '
                onClick={toggleHandlerbylogo}
                src={mayankflix}
                // src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo" />
            {
                (user && <div className='flex items-center'>
                    <IoIosArrowDropdown className='me-1' color='white' size={24} />
                    <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                    <div className='ml-4'>
                        <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2 rounded-md hover:scale-105 hover:bg-red-500 overflow-hidden transition-all duration-300 '>Logout</button>
                        <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 rounded-md ml-2 hover:scale-105 hover:bg-red-500 overflow-hidden transition-all duration-300'>{toggle ? 'Home' : 'Search Movie'}</button>
                    </div>
                </div>)
            }

        </div>
    )
}

export default Header