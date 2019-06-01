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

const MediaCardList = ({ classes, movies, ownMovies, ownSeries }) => {
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
									flag="movie"
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)
		}
		if (movies.data.movieTrendingWeekly) {
			return (
				<div>
					<Grid container spacing={3}>
						{movies.data.movieTrendingWeekly.map(movie => (
							<Grid
								item
								className={classes.root}
								key={movie.tmdbID}
							>
								<MediaCard
									key={movie.tmdbID}
									media={movie}
									flag="movie"
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
								flag="movie"
							/>
						</Grid>
					))}
				</Grid>
			</div>
		)
	} else if (ownSeries) {
		console.log('SERIEEEEES')
		return (
			<div>
				<Grid container spacing={3}>
					{ownSeries.map(series => (
						<Grid item className={classes.root} key={series.tmdbID}>
							<MediaCard
								key={series.tmdbID}
								media={series}
								flag="series"
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
