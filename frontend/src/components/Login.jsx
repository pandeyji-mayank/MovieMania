import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userValue = useSelector((store) => store?.app?.user?._id)
    useEffect(() => {
        if (userValue) {
            navigate('/browse');
        }
    }, [])
    const getInputData = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLogin) {
            try {
                const res = await axios.post(API_ENDPOINT + 'login', { email, password }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (res.data.message) {
                    toast.success(res.data.message);
                }
                dispatch(setUser(res.data.user));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/browse');

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
            }
        }
        else {
            try {
                const res = await axios.post(API_ENDPOINT + 'register', { fullName, email, password }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (res.data.message) {
                    toast.success(res.data.message);
                    setIsLogin(true);
                }
                else {
                    toast.error('Could not register');
                }
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
            }
        }
        setLoading(false);
        setFullName('');
        setEmail('');
        setPassword('');
    }
    return (
        <div className=''>
            <Header />
            <div className=' w-full h-screen overflow-hidden absolute '>
                <img
                    className="w-full h-full object-cover object-bottom"
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Netflix login page"
                />
            </div>
            <form onSubmit={getInputData} className='absolute flex flex-col w-3/12 my-64 p-12 left-0  right-0 m-auto items-center justify-center bg-black text-white rounded-3xl opacity-90' >
                <h1 className='text-3xl  font-semibold mb-5'>{isLogin ? "Login" : "Sign Up"}</h1>
                <div className='flex flex-col'>
                    {
                        !isLogin && <label className='text-xl font-semibold mt-2' >Your Name</label>
                    }
                    {
                        !isLogin && <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder='Write Your Name Here ' className='outline-none p-2 my-2 rounded-md bg-gray-700' />
                    }
                    <label className='text-xl font-semibold mt-2'  >Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your Email ' className='outline-none p-2 my-2 rounded-md bg-gray-700' />
                    <label className='text-xl font-semibold mt-2' >Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Your Password' className='outline-none p-2 mt-2  rounded-md bg-gray-700' />
                    <button className='h-12  hover:bg-red-400 hover:scale-105 overflow-hidden bg-red-600 mt-6 p-3 rounded-md font-semibold flex  items-center justify-center' onClick={getInputData} >
                        {
                            loading && <span className="loading loading-ring loading-lg "></span>
                        }
                        {
                            (!loading) && (isLogin ? "LogIn" : "SignUp")
                        }
                    </button>
                    <p className='mt-2'>{isLogin ? "New Here   ?" : "Already Have an Account?"} <span className='cursor-pointer ml-2 text-blue-300 font-semibold' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Log In"}</span> </p>
                </div>
            </form>
        </div>
    )
}

export default Login




// 2:30