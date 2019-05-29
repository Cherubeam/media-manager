import React, { useEffect, useReducer } from 'react'
import { Query } from 'react-apollo'
import OwnMoviesContext from '../context/OwnMovies'
import moviesReducer from '../reducers/movies'
import Header from './Layouts/Header'

export default () => {
    const [ movies, dispatch ] = useReducer(moviesReducer, [])

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movies'))

        if (movies) {
            console.log('Movie exists in localStorage!')

            dispatch({ 
                type: 'POPULATE_MOVIES', 
                movies
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies))
    }, [movies])

    const addMovie = e => {
        e.preventDefault()
        dispatch({
            type: 'ADD_MOVIE',
            movie
        })
    }

    return (
        <MoviesContext.Provider value={{ movies, dispatch }}>
            <Header />
        </MoviesContext.Provider>
    )
}