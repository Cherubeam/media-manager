import React, { Fragment, useContext, useEffect } from 'react'

import MediaContext from '../context/MediaContext'
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

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(moviesState.movies))
	}, [moviesState])

	const { loading, movies, errorMessage } = moviesState

	return (
		<Fragment>
			<h1>My Movies</h1>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					<MediaCardList ownMovies={movies} />
				)}
			</div>
		</Fragment>
	)
}
