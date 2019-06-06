const searchReducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_MEDIA_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null
			}
		case 'SEARCH_MEDIA_SUCCESS':
			return {
				...state,
				loading: false,
				media: action.payload
			}
		case 'SEARCH_MEDIA_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: action.error
			}
		case 'SEARCH_MOVIES_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null
			}
		case 'SEARCH_MOVIES_SUCCESS':
			return {
				...state,
				loading: false,
				movies: action.payload
			}
		case 'SEARCH_MOVIES_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: action.error
			}
		case 'SEARCH_SERIES_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null
			}
		case 'SEARCH_SERIES_SUCCESS':
			return {
				...state,
				loading: false,
				series: action.payload
			}
		case 'SEARCH_SERIES_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: action.error
			}
		default:
			return state
	}
}

export default searchReducer
