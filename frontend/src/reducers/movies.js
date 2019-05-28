const moviesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_MOVIES':
                return action.movies
        case 'GET_MOVIES_BY_NAME':
            return action.movies
        case 'GET_MOVIE_BY_ID':
                return action.movies
        case 'ADD_MOVIE':
            return [
                ...state,
                action.movie
            ]
        case 'REMOVE_MOVIE':
            return state.filter(movie => movie.originTitle !== action.title)
        default:
            return state
    }
}

export { moviesReducer as default }