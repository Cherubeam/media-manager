import React, { Fragment, useContext, useEffect } from 'react'
import ApolloBoost from 'apollo-boost'

import MediaContext from '../../context/MediaContext'
import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getWeeklyTrendingAll from '../../queries/getWeeklyTrendingAll'
import getMoviesByName from '../../queries/getMoviesByName'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'

// Create Apollo client
const client = new ApolloBoost({
	uri: 'http://localhost:5000'
})

// Load in GraphQL queries
// const GET_WEEKLY_TRENDING_MOVIES = getWeeklyTrendingMovies
const GET_WEEKLY_TRENDING_ALL = getWeeklyTrendingAll
const GET_MOVIES_BY_NAME = getMoviesByName

export default () => {
	const {
		searchState,
		moviesState,
		seriesState,
		filtersState,
		dispatch
	} = useContext(MediaContext)

	useEffect(() => {
		dispatch({
			type: 'SEARCH_MEDIA_REQUEST'
		})

		client
			.query({
				query: GET_WEEKLY_TRENDING_ALL
			})
			.then(result => {
				dispatch({
					type: 'SEARCH_MEDIA_SUCCESS',
					payload: result
				})
			})
			.catch(error => {
				dispatch({
					type: 'SEARCH_MEDIA_FAILURE',
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

	// TODO: seachSeries

	const handleClickMoviesFilter = () => {}

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
					// TODO: media={media, movies, series}? // media={media}, movies={movies}, seriies={series}
					<MediaCardList movies={movies} />
				)}
			</div>
		</Fragment>
	)
}
