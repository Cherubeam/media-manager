import React, { useContext, useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import OwnMoviesContext from '../../context/OwnMovies'

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
    const { handleAddMovie, handleRemoveMovie } = useContext(OwnMoviesContext)
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.poster !== 'https://image.tmdb.org/t/p/w342/null' 
                        ? movie.poster 
                        : defaultMoviePoster
                    }
                    title={movie.title}
                />
                <CardContent>
                    {movie.description}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" onClick={() => handleAddMovie(movie)}>ADD ME</Button>
                <Button size="small" onClick={() => handleRemoveMovie(movie)}>REMOVE</Button>
            </CardActions>
        </Card>
    )
}