const mediaReducer = (state, action) => {
	switch (action.type) {
		case 'POPULATE_MEDIA':
			return {
				...state,
				loading: false,
				movies: action.media
			}
		default:
			return state
	}
}

export default mediaReducer
