const mediaReducer = (state, action) => {
	switch (action.type) {
		case 'POPULATE_MEDIA':
			return {
				...state,
				loading: false,
				media: action.media
			}
		default:
			return state
	}
}

export default mediaReducer
