import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MediaCard from './MediaCard'

const styles = theme => ({
	root: {
		flexGrow: 1
	}
})

const MediaCardList = ({
	classes,
	media,
	movies,
	series,
	ownMovies,
	ownSeries
}) => {
	if (media) {
		console.log('Yeah, some media!!!')
		if (media.data.allTrendingWeekly) {
			return (
				<div>
					<Grid container spacing={3}>
						{media.data.allTrendingWeekly.map(medium => (
							<Grid
								item
								className={classes.root}
								key={medium.tmdbID}
							>
								<MediaCard
									key={medium.tmdbID}
									media={medium} // TODO: refactor 'media' to 'medium' everywhere in this file
									mediaType={medium.mediaType}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)
		}
	}
	if (movies) {
		if (movies.data.movieSearch) {
			return (
				<div>
					<Grid container spacing={3}>
						{movies.data.movieSearch.map(movie => (
							<Grid
								item
								className={classes.root}
								key={movie.tmdbID}
							>
								<MediaCard
									key={movie.tmdbID}
									media={movie}
									mediaType="movie" // TODO: remove hard code
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)
		}
		if (movies.data.allTrendingWeekly) {
			return (
				<div>
					<Grid container spacing={3}>
						{movies.data.allTrendingWeekly.map(movie => (
							<Grid
								item
								className={classes.root}
								key={movie.tmdbID}
							>
								<MediaCard
									key={movie.tmdbID}
									media={movie}
									mediaType="movie" // TODO: remove hard code
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)
		}
	} else if (ownMovies) {
		return (
			<div>
				<Grid container spacing={3}>
					{ownMovies.map(movie => (
						<Grid item className={classes.root} key={movie.tmdbID}>
							<MediaCard
								key={movie.tmdbID}
								media={movie}
								mediaType="movie" // TODO: remove hard code
							/>
						</Grid>
					))}
				</Grid>
			</div>
		)
	} else if (ownSeries) {
		return (
			<div>
				<Grid container spacing={3}>
					{ownSeries.map(series => (
						<Grid item className={classes.root} key={series.tmdbID}>
							<MediaCard
								key={series.tmdbID}
								media={series}
								mediaType="series" // TODO: remove hard code
							/>
						</Grid>
					))}
				</Grid>
			</div>
		)
	}
}

MediaCardList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaCardList)
