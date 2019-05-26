import React from 'react'
import { gql} from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_MOVIE_DETAILS = gql`
    query Movie($movieID: ID!) {
        movieDetails(id: $movieID) {
            originalTitle
            description
        }
    }
`

const TEST = ({ movieID }) => (
    <Query query={GET_MOVIE_DETAILS} variables={{ movieID }}>
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;

        return (
            <div>
                <h1>Testarea</h1>
                <p>{data.movieDetails.originalTitle}</p>
                <p>{data.movieDetails.description}</p>
            </div>
        )
    }}
    </Query>
)

export { TEST as default }

