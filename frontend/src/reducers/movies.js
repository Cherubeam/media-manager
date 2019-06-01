const moviesReducer = (state, action) => {
	switch (action.type) {
		case 'POPULATE_MOVIES':
			return {
				...state,
				loading: false,
				movies: action.movies
			}
		case 'ADD_OWN_MOVIE':
			return {
				...state,
				movies: [...state.movies, action.movie]
			}
		case 'REMOVE_OWN_MOVIE':
			return {
				...state,
				movies: state.movies.filter(movie => movie.tmdbID !== action.id)
			}
		default:
			return state
	}
}

export default moviesReducer
