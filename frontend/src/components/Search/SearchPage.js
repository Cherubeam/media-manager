import React, { useContext, useEffect, useReducer } from 'react'
import ApolloBoost from 'apollo-boost'
import { makeStyles } from '@material-ui/styles'

import SearchMovieContext from '../../context/SearchMovies'
import OwnMoviesContext from '../../context/OwnMovies'
import MediaContext from '../../context/MediaContext'
import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getMoviesByName from '../../queries/getMoviesByName'
import LinearProgess from '../LinearProgress'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'

const client = new ApolloBoost({
	uri: 'http://localhost:5000'
})

// Load in GraphQL queries
const GET_WEEKLY_TRENDING_MOVIES = getWeeklyTrendingMovies
const GET_MOVIES_BY_NAME = getMoviesByName

export default () => {
	const { search, movie, dispatch } = useContext(MediaContext)

	useEffect(() => {
		dispatch({
			type: 'SEARCH_MOVIES_REQUEST'
		})

		client
			.query({
				query: GET_WEEKLY_TRENDING_MOVIES
			})
			.then(result => {
				dispatch({
					type: 'SEARCH_MOVIES_SUCCESS',
					payload: result
				})
			})
			.catch(e => {
				dispatch({
					type: 'SEARCH_MOVIES_FAILURE',
					error: e
				})
			})
	}, [])

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(movie))
	}, [movie])

	const searchMovie = searchValue => {
		dispatch({
			type: 'SEARCH_MOVIES_REQUEST'
		})

		client
			.query({
				query: GET_MOVIES_BY_NAME,
				variables: { query: searchValue }
			})
			.then(result => {
				dispatch({
					type: 'SEARCH_MOVIES_SUCCESS',
					payload: result
				})
			})
			.catch(e => {
				dispatch({
					type: 'SEARCH_MOVIES_FAILURE',
					error: e
				})
			})
	}

	const handleAddMovie = search => {
		const movieIDs = movie.map(movie => movie.tmdbID)

		if (movieIDs.includes(search.tmdbID)) {
			console.log('Entry already exists in own library!')
			return
		}

		dispatch({
			type: 'ADD_OWN_MOVIE',
			movie: search
		})
	}

	const handleRemoveMovie = movie => {
		// TODO: check if movie exists
		dispatch({
			type: 'REMOVE_OWN_MOVIE',
			id: movie.tmdbID
		})
	}

	const { movies, errorMessage, loading } = search

	return (
		<OwnMoviesContext.Provider
			value={{ handleAddMovie, handleRemoveMovie }}
		>
			<SearchBar searchMovie={searchMovie} />
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					<MediaCardList movies={movies} />
				)}
			</div>
		</OwnMoviesContext.Provider>
	)
}
