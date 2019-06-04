import { gql } from 'apollo-boost'

const GET_WEEKLY_TRENDING_ALL = gql`
	query GetWeeklyTrendingALL {
		allTrendingWeekly {
			tmdbID
			originalTitle
			germanTitle
			originalName
			germanName
			releaseDate
			firstAirDate
			description
			tmdbVoteAverage
			tmdbVoteCount
			poster
			mediaType
		}
	}
`

export default GET_WEEKLY_TRENDING_ALL
