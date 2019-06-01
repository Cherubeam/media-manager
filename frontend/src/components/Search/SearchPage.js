import React, { useContext, useEffect } from 'react'
import ApolloBoost from 'apollo-boost'

import OwnMoviesContext from '../../context/OwnMovies'
import MediaContext from '../../context/MediaContext'
import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getMoviesByName from '../../queries/getMoviesByName'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'

const client = new ApolloBoost({
	uri: 'http://localhost:5000'
})

// Load in GraphQL queries
const GET_WEEKLY_TRENDING_MOVIES = getWeeklyTrendingMovies
const GET_MOVIES_BY_NAME = getMoviesByName

export default () => {
	const { searchState, moviesState, dispatch } = useContext(MediaContext)

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
			.catch(error => {
				dispatch({
					type: 'SEARCH_MOVIES_FAILURE',
					error
				})
			})
	}, [])

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(moviesState.movies))
	}, [moviesState])

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
			.catch(error => {
				dispatch({
					type: 'SEARCH_MOVIES_FAILURE',
					error
				})
			})
	}

	const handleAddMovie = selectedMovie => {
		const movieIDs = moviesState.movies.map(movie => movie.tmdbID)

		if (movieIDs.includes(selectedMovie.tmdbID)) {
			// TODO: add notification or similar to the application and remove console.log()
			console.log('Entry already exists in own library!')
			return
		}

		dispatch({
			type: 'ADD_OWN_MOVIE',
			movie: selectedMovie
		})
	}

	const handleRemoveMovie = movie => {
		// TODO: check if movie exists
		dispatch({
			type: 'REMOVE_OWN_MOVIE',
			id: movie.tmdbID
		})
	}

	const { loading, movies, errorMessage } = searchState

	return (
		<OwnMoviesContext.Provider
			value={{ handleAddMovie, handleRemoveMovie }}
		>
			<h1>Trending Movies</h1>
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
