import React, { useEffect, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const VideoTitle = ({ title, overview }) => {
    const value = useSelector(store => store?.movie?.trailerMovie?.key);
    const [redirect, setRedirect] = useState('https://www.youtube.com/embed/' + value ? value : 'xcJtL7QggTI' + '?si=n3tGEITKWHQddX_w');
    useEffect(() => {
        setRedirect('https://www.youtube.com/embed/' + value ? value : 'xcJtL7QggTI' + '?si=n3tGEITKWHQddX_w')
        console.log(redirect);
    }, [value, redirect, title])
    return (
        <div className='z-10 w-[vw] aspect-video absolute text-white pt-[18%] p-12'>
            <h1 className='text-3xl font-extrabold'>{title}</h1>
            <p className='mb-10 w-1/3 mt-2' >{overview}</p>
            <div className=' flex items-center mt-4 h-12'>
                <a href={redirect}
                    className=' h-full flex items-center px-6 py-2 m- bg-white text-black rounded-md  opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-200' >
                    <CiPlay1 size="24px" />

                    <span className='ms-2'>
                        Play
                    </span>
                </a>
                <button href={redirect} className=' h-full flex items-center px-6 py-2 m-3 bg-white text-black rounded-md opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-200'>
                    <BsInfoCircle size='24px' />
                    <span className='ms-2'>
                        Watch More
                    </span>
                </button>
            </div>
        </div>
    )
}

export default VideoTitle