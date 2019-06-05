import React, { useContext, useState } from 'react'
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

import MediaContext from '../../context/MediaContext'
import DefaultImage from '../../../public/images/movie-default.png'
import WarningSnackbar from '../Notifications/WarningSnackbar'

const defaultMoviePoster = DefaultImage

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 342
	},
	media: {
		height: 513,
		width: 342
	}
}))

// TODO: implementation, when user clicks on MediaCard
// const GET_MOVIE_DETAILS = getMovieDetails

const MediaCard = ({ media, mediaType }) => {
	const classes = useStyles()
	const { moviesState, seriesState, dispatch } = useContext(MediaContext)
	const [snackbarState, setSnackbarState] = useState({
		snackbarOpen: false
	})

	const handleOpenSnackbar = () => {
		setSnackbarState({ snackbarOpen: true })
	}

	const handleCloseSnackbar = () => {
		setSnackbarState({ snackbarOpen: false })
	}

	const handleAddMedia = (selectedMedia, type) => {
		// TODO: add mediaType to all GraphQL-Queries
		if (type === 'movie') {
			const movieIDs = moviesState.movies.map(movie => movie.tmdbID)

			if (movieIDs.includes(selectedMedia.tmdbID)) {
				handleOpenSnackbar()
				return
			}

			dispatch({
				type: 'ADD_OWN_MOVIE',
				movie: selectedMedia
			})
		} else if (type === 'tv') {
			const seriesIDs = seriesState.series.map(show => show.tmdbID)

			if (seriesIDs.includes(selectedMedia.tmdbID)) {
				handleOpenSnackbar()
				return
			}

			dispatch({
				type: 'ADD_OWN_SERIES',
				series: selectedMedia
			})
		}
	}

	const handleRemoveMedia = (selectedMedia, type) => {
		if (type === 'movie') {
			// TODO: check if movie exists
			dispatch({
				type: 'REMOVE_OWN_MOVIE',
				id: selectedMedia.tmdbID
			})
		} else if (type === 'tv') {
			// TODO: check if series exists
			dispatch({
				type: 'REMOVE_OWN_SERIES',
				id: selectedMedia.tmdbID
			})
		}
	}

	const { snackbarOpen } = snackbarState

	return (
		<div>
			{snackbarOpen && (
				<WarningSnackbar
					mediaTitle={
						media.germanTitle ? media.germanTitle : media.germanName
					}
					snackbarOpen={snackbarOpen}
					handleCloseSnackbar={handleCloseSnackbar}
				/>
			)}
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={
							media.poster !==
							'https://image.tmdb.org/t/p/w342/null'
								? media.poster
								: defaultMoviePoster
						}
						title={
							media.germanTitle
								? media.germanTitle
								: media.germanName
						}
					/>
				</CardActionArea>
				<CardActions disableSpacing>
					<Fab
						onClick={() => handleAddMedia(media, media.mediaType)}
						color="primary"
						size="medium"
						aria-label="Add to movie library"
					>
						<Add />
					</Fab>
					<Fab
						onClick={() =>
							handleRemoveMedia(media, media.mediaType)
						}
						color="secondary"
						size="medium"
						aria-label="Remove from movie library"
					>
						<Remove />
					</Fab>
				</CardActions>
			</Card>
		</div>
	)
}

MediaCard.propTypes = {
	media: PropTypes.object.isRequired,
	mediaType: PropTypes.string.isRequired
}

export default MediaCard
