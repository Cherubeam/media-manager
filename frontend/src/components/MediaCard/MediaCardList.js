import React, { useContext } from 'react'
import MediaCard from './MediaCard'
import SearchMoviesContext from '../../context/SearchMovies'

export default () => {
	const { movies } = useContext(SearchMoviesContext)

	if (movies.data.movieSearch) {
		return movies.data.movieSearch.map((movie, index) => (
			<MediaCard key={index} movie={movie} />
		))
	} else {
		return movies.data.movieTrendingWeekly.map((movie, index) => (
			<MediaCard key={index} movie={movie} />
		))
	}
}
