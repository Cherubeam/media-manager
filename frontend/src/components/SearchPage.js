import React, { useState, useEffect, useReducer } from 'react'
import ApolloBoost, { gql } from 'apollo-boost'
import MoviesContext from '../context/moviesContext'
import searchReducer from '../reducers/search'
import AppBar from './layout/AppBar'
import SearchBar from './SearchBar'
import MediaCardList from './MediaCardList'

const client = new ApolloBoost({
    uri: 'http://localhost:5000'
})

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
}

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

const GET_MOVIE_DETAILS = gql`
    query Movie($movieID: ID!) {
        movieDetails(id: $movieID) {
            tmdbID
            originalTitle
            description
            poster
        }
    }
`

export default () => {
    const [state, dispatch] = useReducer(searchReducer, initialState)

    const searchMovie = searchValue => {
        dispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        })

        client.query({
            query: GET_MOVIES_BY_NAME,
            variables: { query: searchValue }
        }).then(result => {
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: result
            })
        }).catch(e => {
            dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: e
            })
        })
    }

    const { movies, errorMessage, loading } = state;

    return (
        <MoviesContext.Provider value={{ dispatch }}>
            <AppBar />
            <SearchBar searchMovie={searchMovie} />
            <div className="movies">
                {loading && !errorMessage ? (
                    <span>loading... </span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    <MediaCardList movies={movies} />
                )}
            </div>
      </MoviesContext.Provider>
    )
}