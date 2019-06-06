const filtersReducer = (state, action) => {
	switch (action.type) {
		// TODO: implement filter for 'ALL'
		case 'SET_MOVIES_FILTER':
			return {
				mediaType: 'movie'
			}
		case 'SET_SERIES_FILTER':
			return {
				mediaType: 'series'
			}
		default:
			return state
	}
}

export default filtersReducer
