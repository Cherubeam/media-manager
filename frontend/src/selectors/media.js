export default (mediaState, filtersState) => {
	return mediaState.media.filter(
		medium => medium.mediaType === filtersState.mediaType
	)
}
