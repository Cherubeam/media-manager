import React, { useEffect, useReducer } from 'react'
import ApolloBoost from 'apollo-boost'

import OwnMoviesContext from '../context/OwnMovies'
import moviesReducer from '../reducers/movies'
import MediaCardList from './MediaCard/MediaCardList'

export default () => {
	const [movieState, movieDispatch] = useReducer(moviesReducer, [])

	useEffect(() => {
		const ownMovies = JSON.parse(localStorage.getItem('movies'))

		if (ownMovies) {
			movieDispatch({
				type: 'POPULATE_MOVIES',
				movies: ownMovies
			})
		}
	}, [])

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

	return (
		<OwnMoviesContext.Provider
			value={{ handleAddMovie, handleRemoveMovie }}
		>
			<h1>Movies Dashboard</h1>
		</OwnMoviesContext.Provider>
	)
}
