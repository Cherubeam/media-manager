const seriesReducer = (state, action) => {
	switch (action.type) {
		case 'POPULATE_SERIES':
			return {
				...state,
				loading: false,
				series: action.series
			}
		case 'ADD_OWN_SERIES':
			return {
				...state,
				series: [...state.series, action.series]
			}
		case 'REMOVE_OWN_SERIES':
			return {
				...state,
				series: state.series.filter(
					series => series.tmdbID !== action.id
				)
			}
		default:
			return state
	}
}

export default seriesReducer
