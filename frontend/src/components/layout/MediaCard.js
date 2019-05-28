import React, { useContext } from 'react'
import { gql} from 'apollo-boost'
import { Query } from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import MoviesContext from '../../context/moviesContext'

const defaultMoviePoster = 'https://images.pexels.com/photos/1820567/pexels-photo-1820567.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const useStyles = makeStyles({
    card: {
      maxWidth: 342,
    },
    media: {
      height: 513,
      width: 342
    },
  })
  
const GET_MOVIE_DETAILS = gql`
    query Movie($movieID: ID!) {
        movieDetails(id: $movieID) {
            originalTitle
            description
        }
    }
`

export default ({ movie }) => {
    const { dispatch } = useContext(MoviesContext)
    const classes = useStyles()

    const removeMovie = id => {
        dispatch({
            type: 'REMOVE_MOVIE',
            id
        })
    }

    return (
        // <Query query={GET_MOVIE_DETAILS} variables={{ movieID }}>
        //     {({ loading, error, data }) => {
        //         if (loading) return <div>Loading...</div>;
        //         if (error) return <div>Error :(</div>;
        //     }}
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={movie.poster}
                        title={movie.title}
                    />
                    <CardContent>
                        {movie.description}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                <button onClick={() => removeMovie(id)}>REMOVE</button>
            </Card>
        // </Query>
    )
}

// const TEST = ({ movieID }) => (
//     <Query query={GET_MOVIE_DETAILS} variables={{ movieID }}>
//         {({ loading, error, data }) => {
//             if (loading) return <div>Loading...</div>;
//             if (error) return <div>Error :(</div>;

//         return (
//             <div>
//                 <h1>Testarea</h1>
//                 <p>{data.movieDetails.originalTitle}</p>
//                 <p>{data.movieDetails.description}</p>
//             </div>
//         )
//     }}
//     </Query>
// )