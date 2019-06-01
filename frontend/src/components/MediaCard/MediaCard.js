import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	Fab
} from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'

// import getMovieDetails from '../../queries/getMovieDetails'
import OwnMoviesContext from '../../context/OwnMovies'
import DefaultImage from '../../../public/images/movie-default.png'

const defaultMoviePoster = DefaultImage

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 342
	},
	media: {
		height: 513,
		width: 342
	}
	// fabButton: {
	// 	position: 'relative',
	// 	zIndex: 1,
	// 	top: -70,
	// 	left: -110,
	// 	right: 0,
	// 	margin: '0 auto'
	// }
}))

// TODO: implementation, when user clicks on MediaCard
// const GET_MOVIE_DETAILS = getMovieDetails

const MediaCard = ({ movie }) => {
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
			</CardActionArea>
			<CardActions disableSpacing>
				<Fab
					onClick={() => handleAddMovie(movie)}
					color="primary"
					size="medium"
					aria-label="Add to movie library"
				>
					<Add />
				</Fab>
				<Fab
					onClick={() => handleRemoveMovie(movie)}
					color="secondary"
					size="medium"
					aria-label="Remove from movie library"
				>
					<Remove />
				</Fab>
			</CardActions>
		</Card>
	)
}

MediaCard.propTypes = {
	movie: PropTypes.object.isRequired
}

export default MediaCard
