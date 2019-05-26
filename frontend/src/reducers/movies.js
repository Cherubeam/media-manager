const moviesReducer = (state, action) => {
    switch(action.type) {
        case 'GET_MOVIE':
            return action.movies
        case 'POPULATE_MOVIES':
            return action.movies
        default:
            return state
    }
}

export { moviesReducer as default }