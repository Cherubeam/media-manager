import React, { useEffect, useReducer } from 'react'
import ApolloBoost from 'apollo-boost'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'

import SearchMovieContext from '../../context/SearchMovies'
import OwnMoviesContext from '../../context/OwnMovies'
import searchReducer from '../../reducers/search'
import movieReducer from '../../reducers/movies'
import getWeeklyTrendingMovies from '../../queries/getWeeklyTrendingMovies'
import getMoviesByName from '../../queries/getMoviesByName'
import LinearProgess from '../LinearProgress'
import SearchBar from './SearchBar'
import MediaCardList from '../MediaCard/MediaCardList'

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	}
})

const client = new ApolloBoost({
	uri: 'http://localhost:5000'
})

// setup initial search state
const initialState = {
	loading: true,
	movies: [],
	errorMessage: null
}

// load in GraphQL queries
const GET_WEEKLY_TRENDING_MOVIES = getWeeklyTrendingMovies
const GET_MOVIES_BY_NAME = getMoviesByName

export default () => {
	const classes = useStyles()
	const [searchState, searchDispatch] = useReducer(
		searchReducer,
		initialState
	)
	const [movieState, movieDispatch] = useReducer(movieReducer, [])

	useEffect(() => {
		searchDispatch({
			type: 'SEARCH_MOVIES_REQUEST'
		})

		client
			.query({
				query: GET_WEEKLY_TRENDING_MOVIES
			})
			.then(result => {
				searchDispatch({
					type: 'SEARCH_MOVIES_SUCCESS',
					payload: result
				})
			})
			.catch(e => {
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

		client
			.query({
				query: GET_MOVIES_BY_NAME,
				variables: { query: searchValue }
			})
			.then(result => {
				searchDispatch({
					type: 'SEARCH_MOVIES_SUCCESS',
					payload: result
				})
			})
			.catch(e => {
				searchDispatch({
					type: 'SEARCH_MOVIES_FAILURE',
					error: e
				})
			})
	}

	const handleAddMovie = movie => {
		const movieIDs = movieState.map(ownMovie => ownMovie.tmdbID)

		if (movieIDs.includes(movie.tmdbID)) {
			console.log('Entry already exists in own library!')
			return
		}

		movieDispatch({
			type: 'ADD_OWN_MOVIE',
			movie
		})
	}

	const handleRemoveMovie = movie => {
		// TODO: check if movie exists
		movieDispatch({
			type: 'REMOVE_OWN_MOVIE',
			id: movie.tmdbID
		})
	}

	const { movies, errorMessage, loading } = searchState

	return (
		<SearchMovieContext.Provider value={{ movies }}>
			<OwnMoviesContext.Provider
				value={{ handleAddMovie, handleRemoveMovie }}
			>
				{loading && !errorMessage && <LinearProgess />}
				{console.log(loading)}
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
