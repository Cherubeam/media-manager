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
// import OwnMoviesContext from '../../context/OwnMovies'
import MediaContext from '../../context/MediaContext'
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

const MediaCard = ({ media, flag }) => {
	const { moviesState, seriesState, dispatch } = useContext(MediaContext)
	const classes = useStyles()

	const handleAddMedia = (selectedMedia, mediaFlag) => {
		if (mediaFlag === 'movie') {
			const movieIDs = moviesState.movies.map(movie => movie.tmdbID)

			if (movieIDs.includes(selectedMedia.tmdbID)) {
				// TODO: add notification or similar to the application and remove console.log()
				console.log('Movie already exists in own library!')
				return
			}

			dispatch({
				type: 'ADD_OWN_MOVIE',
				movie: selectedMedia
			})
		} else if (mediaFlag === 'series') {
			const seriesIDs = seriesState.series.map(series => series.tmdbID)

			if (seriesIDs.includes(selectedMedia.tmdbID)) {
				// TODO: add notification or similar to the application and remove console.log()
				console.log('Series already exists in own library!')
				return
			}

			dispatch({
				type: 'ADD_OWN_SERIES',
				movie: selectedMedia
			})
		}
	}

	const handleRemoveMedia = movie => {
		// TODO: check if movie exists
		dispatch({
			type: 'REMOVE_OWN_MOVIE',
			id: movie.tmdbID
		})
	}

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={
						media.poster !== 'https://image.tmdb.org/t/p/w342/null'
							? media.poster
							: defaultMoviePoster
					}
					title={media.title}
				/>
			</CardActionArea>
			<CardActions disableSpacing>
				<Fab
					onClick={() => handleAddMedia(media, flag)}
					color="primary"
					size="medium"
					aria-label="Add to movie library"
				>
					<Add />
				</Fab>
				<Fab
					onClick={() => handleRemoveMedia(media, flag)}
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
	media: PropTypes.object.isRequired,
	flag: PropTypes.string.isRequired
}

export default MediaCard
