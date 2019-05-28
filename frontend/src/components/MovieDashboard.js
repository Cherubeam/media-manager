import React, { useState, useEffect, useReducer } from 'react'
import { Query } from 'react-apollo'
import MoviesContext from '../context/moviesContext'
import moviesReducer from '../reducers/movies'
import AppBar from './layout/AppBar'
import MediaCard from './layout/MediaCard'

export default () => {
    const [movies, dispatch] = useReducer(moviesReducer, [])

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
            <AppBar />
            <MediaCard />
        </MoviesContext.Provider>
    )
}