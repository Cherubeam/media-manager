import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import getMovieDetails from '../../queries/getMovieDetails'
import OwnMoviesContext from '../../context/OwnMovies'
import DefaultImage from '../../../public/images/movie-default.png'

const defaultMoviePoster = DefaultImage

const useStyles = makeStyles({
	card: {
		maxWidth: 342
	},
	icon: {
		fontSize: 32
	},
	media: {
		height: 513,
		width: 342
	}
})

// TODO: implementation, when user clicks on MediaCard
const GET_MOVIE_DETAILS = getMovieDetails

export default ({ movie }) => {
	const { handleAddMovie, handleRemoveMovie } = useContext(OwnMoviesContext)
	const classes = useStyles()

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={
						movie.poster !== 'https://image.tmdb.org/t/p/w342/null'
							? movie.poster
							: defaultMoviePoster
					}
					title={movie.title}
				/>
				<CardContent />
			</CardActionArea>
			<CardActions>
				<IconButton
					onClick={() => handleAddMovie(movie)}
					aria-label="Add to movie library"
				>
					<AddIcon />
				</IconButton>
				<Button size="small" onClick={() => handleRemoveMovie(movie)}>
					REMOVE
				</Button>
			</CardActions>
		</Card>
	)
}
