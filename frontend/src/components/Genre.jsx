import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { options } from '../utils/constant'
import MovieTile from './MovieTile'
import toast from 'react-hot-toast'


const Genre = () => {
    const [genre, setGenre] = useState();
    const [genreId, setGenreId] = useState(28);
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        const getdetails = async () => {
            try {
                const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options);
                setGenre(res.data.genres);

            } catch (error) {
                console.log(error);
            }
        }
        getdetails();
    }, [])


    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(2);
    const loaderRef = useRef(null);

    useEffect(() => {
        const getmoviebyGenre = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options);
                // console.log(res.data.results);
                items(res.data.results);

            } catch (error) {
                console.log(error);
            }
        }
        getmoviebyGenre();
    }, [genreId])




    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        console.log(index);
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${index}&sort_by=popularity.desc&with_genres=${genreId}`, options).then((res) => {
            setItems((prev) => [...prev, ...res.data.results]);

            console.log(res.data);
            if (res.data.total_pages > index)
                setIndex((prev => prev + 1));
        }).catch((err) => console.log(err));
        setIsLoading(false);
    }, [index, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) fetchData();

        })

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        }
    }, [fetchData]);



    const [tempgenresdetails, setTempGenresDetails] = useState({ id: 28, name: 'Action' });
    useEffect(() => {
        // toast.success(`${tempgenresdetails.name + ' Movie'}`);
        console.log(tempgenresdetails);
        setGenreId(tempgenresdetails.id);
        setItems([]);
        setIndex(1);
        // fetchData();
    }, [tempgenresdetails])


    return (
        <div>
            <Header />
            <div className='flex flex-row ' >
                <div className='sticky left-0 h-screen w-1/6  flex flex-col '>
                    <div className='mt-32'></div>
                    {
                        genre && genre.map((item, ind) => (
                            <button
                                onClick={() => setTempGenresDetails(item)}
                                key={ind}
                                className="btn my-1 mx-8"
                            >
                                {item.name}
                            </button>
                        ))
                    }
                </div>
                <div className='w-full  h-full'>
                    <div className='w-full rounded-t-2xl  bg-slate-800 mt-32'>
                        <div className='h-1'> </div>
                        <div className='w-full py-7 flex items-center justify-center'>
                            <h2 className='text-7xl font-semibold tracking-widest ease-linear animate-pulse  text-white'>
                                All {tempgenresdetails.name} Movies
                            </h2>
                        </div>
                        <div>

                            <div className="grid grid-cols-4 gap-4 m-8 ">
                                {
                                    items && (
                                        items.map((movieItem) => {
                                            return <MovieTile key={movieItem.id} movieId={movieItem.id} />
                                        })
                                    )
                                }
                            </div>
                            <div ref={loaderRef}>{isLoading && <div className='w-full h-36 flex  justify-center items-center'> <span className="loading loading-ring loading-lg"></span></div>}</div>
                        </div>
                        <div className='w-full h-48 flex  justify-center items-center '> <span className="h-56 loading loading-ring loading-lg"></span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Genre