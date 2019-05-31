import React, { useContext, useEffect } from 'react'
import ApolloBoost from 'apollo-boost'

import MediaContext from '../context/MediaContext'
import OwnMoviesContext from '../context/OwnMovies'
import moviesReducer from '../reducers/movies'
import MediaCardList from './MediaCard/MediaCardList'

export default () => {
	const { moviesState, dispatch } = useContext(MediaContext)

	useEffect(() => {
		const movies = JSON.parse(localStorage.getItem('movies'))

		if (movies) {
			dispatch({
				type: 'POPULATE_MOVIES',
				movies
			})
		}
	}, [])

	const handleRemoveMovie = movie => {
		// TODO: check if movie exists
		dispatch({
			type: 'REMOVE_OWN_MOVIE',
			id: movie.tmdbID
		})
	}

	const { loading, movies, errorMessage } = moviesState

	return (
		<OwnMoviesContext.Provider value={{ handleRemoveMovie }}>
			<h1>Movies Dashboard</h1>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					<MediaCardList ownMovies={movies} />
				)}
			</div>
		</OwnMoviesContext.Provider>
	)
}
