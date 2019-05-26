import React from 'react'
import { gql} from 'apollo-boost'
import { Query } from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import batman from '../../../public/images/batman.jpg'

const defaultMoviePoster = ''

const useStyles = makeStyles({
    card: {
      maxWidth: 350,
    },
    media: {
      height: 550,
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


export default ({ movieID }) => {
    const classes = useStyles()

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
                        image={batman}
                        title="Batman Begins"
                    />
                    <CardContent>
                        Text
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        // </Query>
    )
}

// https://images.pexels.com/photos/1820567/pexels-photo-1820567.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500