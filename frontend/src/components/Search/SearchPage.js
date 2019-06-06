import React, { useContext, useEffect } from 'react'
import ApolloBoost from 'apollo-boost'

import MediaContext from '../../context/MediaContext'
// import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getWeeklyTrendingAll from '../../queries/getWeeklyTrendingAll'
import getMoviesByName from '../../queries/getMoviesByName'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'
import selectMedia from '../../selectors/media'

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
		mediaState,
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

	const handleClickMoviesFilter = (state, filter) => {
		console.log('STATE IN HANDLER:', state)
		console.log('FILTER IN HANDLER', filter)

		dispatch({
			type: filter === 'movie' ? 'SET_MOVIES_FILTER' : 'SET_SERIES_FILTER'
		})

		const media = selectMedia(state, filter)
		console.log('MEDIA: ', media)

		dispatch({
			type: 'POPULATE_MEDIA',
			media
		})
	}

	// let loading
	// let media
	// let movies
	// let series
	// let errorMessage

	// if (
	// 	searchState.media.length > 0 ||
	// 	searchState.movies.length > 0 ||
	// 	searchState.series.length > 0
	// ) {
	// 	;({ loading, media, movies, series, errorMessage } = searchState)
	// } else if (mediaState.media.length > 0) {
	// 	;({ loading, media, errorMessage } = mediaState)
	// }

	// console.log(searchState)
	// console.log(mediaState)

	const { loading, media, movies, series, errorMessage } = searchState

	return (
		<div>
			<h1>Trending Movies</h1>
			<SearchBar
				searchMovie={searchMovie}
				handleClickMoviesFilter={handleClickMoviesFilter}
			/>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					<MediaCardList
						media={media}
						movies={movies}
						series={series}
					/>
				)}
			</div>
		</div>
	)
}
