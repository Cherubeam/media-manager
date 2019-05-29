import React, { useState, useEffect, useReducer } from 'react'
import ApolloBoost, { gql } from 'apollo-boost'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import SearchMovieContext from '../context/SearchMovies'
import OwnMoviesContext from '../context/OwnMovies'
import searchReducer from '../reducers/search'
import movieReducer from '../reducers/movies'
import LinearProgess from './LinearProgress'
import Header from './Layouts/Header'
import SearchBar from './SearchBar'
import MediaCardList from './MediaCard/MediaCardList'
import AutoGrid from './Layouts/Header'

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
  })

const client = new ApolloBoost({
    uri: 'http://localhost:5000'
})

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
}

const GET_WEEKLY_TRENDING_MOVIES = gql`
    query Movie {
        movieTrendingWeekly {
            tmdbID
            originalTitle
            germanTitle
            releaseDate
            description
            tmdbVoteAverage
            tmdbVoteCount
            popularity
            poster
        }
    }
`

const GET_MOVIES_BY_NAME = gql`
    query Movie($query: String!) {
        movieSearch(query: $query) {
            tmdbID
            originalTitle
            germanTitle
            releaseDate
            description
            tmdbVoteAverage
            tmdbVoteCount
            poster
        }
    }
`

export default () => {
    const classes = useStyles()
    const [ searchState, searchDispatch ] = useReducer(searchReducer, initialState)
    const [ movieState, movieDispatch ] = useReducer(movieReducer, [])

    useEffect(() => {
        searchDispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        })

        client.query({
            query: GET_WEEKLY_TRENDING_MOVIES
        }).then(result => {
            searchDispatch({
                type: 'SEARCH_MOVIES_SUCCESS',
                payload: result
            })
        }).catch(e => {
            searchDispatch({
                type: 'SEARCH_MOVIES_FAILURE',
                error: e
            })
        })
    }, [])

    useEffect(() => {
        const ownMovies = JSON.parse(localStorage.getItem('movies'))

        if (ownMovies) {
            movieDispatch({
                type: 'POPULATE_MOVIES',
                movies: ownMovies
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movieState))
    }, [movieState])

    const searchMovie = searchValue => {
        searchDispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        })

        client.query({
            query: GET_MOVIES_BY_NAME,
            variables: { query: searchValue }
        }).then(result => {
            searchDispatch({
                type: 'SEARCH_MOVIES_SUCCESS',
                payload: result
            })
        }).catch(e => {
            searchDispatch({
                type: 'SEARCH_MOVIES_FAILURE',
                error: e
            })
        })
    }

    const handleAddMovie = movie => {
        movieDispatch({
            type: 'ADD_OWN_MOVIE',
            movie
        })
    }

    const handleRemoveMovie = movie => {
        movieDispatch({
            type: 'REMOVE_OWN_MOVIE',
            id: movie.tmdbID
        })
    }

    const { movies, errorMessage, loading } = searchState;

    return (
        <SearchMovieContext.Provider value={{ movies }}>
            <OwnMoviesContext.Provider value={{ handleAddMovie, handleRemoveMovie }}>
                {loading && !errorMessage && <LinearProgess />}
                <Header />
                <SearchBar searchMovie={searchMovie} />
                <div className="movies">
                    {loading && !errorMessage ? (
                        <span>loading...</span>
                    ) : errorMessage ? (
                        <div className="errorMessage">{errorMessage}</div>
                    ) : (
                        <MediaCardList />
                    )}
                </div>
            </OwnMoviesContext.Provider>  
        </SearchMovieContext.Provider>

    )
}