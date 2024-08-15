import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { options } from '../utils/constant'
import MovieTile from './MovieTile'
import toast from 'react-hot-toast'


const Genre = () => {
    const [genre, setGenre] = useState();
    const [genreId, setGenreId] = useState(28);
    const [movie, setMovie] = useState(null);
    const [currgenre, setCurrGenre] = useState('Action');
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
    useEffect(() => {
        const getmoviebyGenre = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options);
                // console.log(res.data.results);
                setMovie(res.data.results);

            } catch (error) {
                console.log(error);
            }
        }
        getmoviebyGenre();
    }, [genreId])

    const [tempgenresdetails, setTempGenresDetails] = useState({ id: 28, name: 'Action' });
    useEffect(() => {
        toast.success(`${tempgenresdetails.name + ' Movie'}`);
        console.log(tempgenresdetails);
        setGenreId(tempgenresdetails.id);
    }, [tempgenresdetails])


    return (
        <div>
            <Header />
            <div className='flex flex-row ' >
                <div className='h-screen w-1/6   flex flex-col '>
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
                        <div className="grid grid-cols-4 gap-4 m-8 ">
                            {
                                movie && (
                                    movie.map((movieItem) => {
                                        return <MovieTile key={movieItem.id} movieId={movieItem.id} />
                                    })
                                )
                            }
                        </div>

                        <div className='h-20  w-full flex justify-center ' ><span className="loading loading-ring loading-lg"></span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Genre