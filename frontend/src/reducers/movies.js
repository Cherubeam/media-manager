const moviesReducer = (state, action) => {
	switch (action.type) {
		case 'POPULATE_MOVIES':
			return {
				...state,
				loading: false,
				movies: action.movies
			}
		case 'GET_WEEKLY_TRENDING_MOVIES':
			return action.movies
		case 'GET_MOVIES_BY_NAME':
			return action.movies
		case 'GET_MOVIE_BY_ID':
			return action.movies
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

export { moviesReducer as default }
