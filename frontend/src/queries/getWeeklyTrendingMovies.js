import { gql } from 'apollo-boost'

const GET_WEEKLY_TRENDING_MOVIES = gql`
	query GetWeeklyTrendingMovies {
		movieTrendingWeekly {
			tmdbID
			originalTitle
			germanTitle
			releaseDate
			description
			tmdbVoteAverage
			tmdbVoteCount
			popularity
			poster
		}
	}
`

export default GET_WEEKLY_TRENDING_MOVIES
