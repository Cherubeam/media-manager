import { gql } from 'apollo-boost'

const GET_MOVIE_DETAILS = gql`
	query GetMovieDetails($movieID: ID!) {
		movieDetails(id: $movieID) {
			originalTitle
			description
		}
	}
`

export default GET_MOVIE_DETAILS
