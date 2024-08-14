import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { options } from '../utils/constant'
import MovieTile from './MovieTile'


const Genre = () => {
    const [genre, setGenre] = useState();
    const [genreId, setGenreId] = useState(28);
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        const getdetails = async () => {
            try {
                const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options);
                setGenre(res.data.genres);
                console.log(genre);
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

    return (
        <div>
            <Header />
            <div className='flex flex-row ' >
                <div className='h-screen w-1/6   flex flex-col '>
                    <div className='mt-32'></div>
                    {
                        genre && genre.map((item, ind) => (
                            <button
                                onClick={() => { setGenreId(item.id) }}
                                key={ind}
                                className="btn my-1 mx-8"
                            >
                                {item.name}
                            </button>
                        ))
                    }
                </div>
                <div className='w-full  h-full'>
                    <div className='w-full rounded-t-2xl bg-slate-600 mt-32'>
                        <div className='h-1'></div>
                        <div class="grid grid-cols-4 gap-4 m-8 ">
                            {
                                movie && (
                                    movie.map((movieItem) => {
                                        return <MovieTile key={movieItem.id} movie={movieItem} />
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Genre