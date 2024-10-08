import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import ShowMovie from './ShowMovie';
import FavMovie from './FavMovie';
import Genre from './Genre';
const SignUp = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/browse',
            element: <Browse />
        },
        {
            path: '/show',
            element: <ShowMovie />
        },
        {
            path: '/fav',
            element: <FavMovie />
        },
        {
            path: '/genre',
            element: <Genre />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default SignUp


// to add movie based on genres