import { gql } from 'apollo-boost'

const GET_MOVIES_BY_NAME = gql`
	query GetMoviesByName($query: String!) {
		movieSearch(query: $query) {
			tmdbID
			originalTitle
			germanTitle
			releaseDate
			description
			tmdbVoteAverage
			tmdbVoteCount
			poster
		}
	}
`

export default GET_MOVIES_BY_NAME
