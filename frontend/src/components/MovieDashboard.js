import React, { useEffect, useReducer } from 'react'
import ApolloBoost, { gql} from 'apollo-boost'
import { Query } from 'react-apollo'
import moviesReducer from '../reducers/movies'
import AppBar from './layout/AppBar'
import MediaCard from './layout/MediaCard'
import SearchBar from './SearchBar';
import moviesContext from '../context/moviesContext'
import TEST from './TEST'

const client = new ApolloBoost({
    uri: 'http://localhost:5000'
})

const GET_MOVIE_DETAILS = gql`
    query Movie($movieID: ID!) {
        movieDetails(id: $movieID) {
            originalTitle
            description
        }
    }
`

const testMovies = [{
    title: 'Batman Begins',
    actor: 'Christian Bale',
    year: '2003'
}]

localStorage.setItem('movies', JSON.stringify(testMovies))

export default () => {
    const [movies, dispatch] = useReducer(moviesReducer, [])

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movies'))

        if (movies) {
            console.log('Movie exists in localStorage!')

            dispatch({ 
                type: 'POPULATE_MOVIES', 
                movies
            })
        }
    }, [])

    const searchMovie = searchValue => {
        console.log('--- SEARCH ---')
        console.log('ID: ', searchValue)

        const result = client.query({
            query: GET_MOVIE_DETAILS,
            variables: { movieID: searchValue }
        }).then(response => {
            console.log(response)
        })
    }

    return (
        <moviesContext.Provider value={{ movies, dispatch }}>
            <AppBar />
            <SearchBar searchMovie={searchMovie} />
            <MediaCard />
        </moviesContext.Provider>
    )
}