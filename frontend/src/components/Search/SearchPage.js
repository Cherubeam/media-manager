import React, { Fragment, useContext, useEffect } from 'react'
import ApolloBoost from 'apollo-boost'

import MediaContext from '../../context/MediaContext'
import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getMoviesByName from '../../queries/getMoviesByName'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'

// Create Apollo client
const client = new ApolloBoost({
	uri: 'http://localhost:5000'
})

// Load in GraphQL queries
const GET_WEEKLY_TRENDING_MOVIES = getWeeklyTrendingMovies
const GET_MOVIES_BY_NAME = getMoviesByName

export default () => {
	const { searchState, moviesState, seriesState, dispatch } = useContext(
		MediaContext
	)

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

	useEffect(() => {
		localStorage.setItem('series', JSON.stringify(seriesState.series))
	}, [seriesState])

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

	const { loading, movies, errorMessage } = searchState

	return (
		<Fragment>
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
		</Fragment>
	)
}
