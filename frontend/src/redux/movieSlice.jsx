import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        nowPlayingMovies: null,
        popularMovie: null,
        topRatedMovie: null,
        upcomingMovie: null,
        toggle: false,
        trailerMovie: 'xcJtL7QggTI',
        movieIdToDisplay: null
    },
    reducers: {
        //actions
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovie = action.payload;
        },
        getTopRatedMovies: (state, action) => {
            state.topRatedMovie = action.payload;
        },
        getUpcomingMovies: (state, action) => {
            state.upcomingMovie = action.payload;
        },
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },
        makeToggle: (state) => {
            state.toggle = false;
        },
        getTrailer: (state, action) => {
            state.trailerMovie = action.payload;
        },
        getMovieIdToDisplay: (state, action) => {
            if (action.payload)
                state.movieIdToDisplay = action.payload;
        }
    }
})

export const { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, setToggle, getTrailer, getMovieIdToDisplay, makeToggle } = movieSlice.actions;
export default movieSlice.reducer;