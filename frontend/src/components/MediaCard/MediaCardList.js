import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MediaCard from './MediaCard'

console.log('Load MediaCardList.js')

const styles = theme => ({
	root: {
		flexGrow: 1
	}
})

const MediaCardList = ({ classes, movies, ownMovies }) => {
	if (movies) {
		if (movies.data.movieSearch) {
			return (
				<div>
					<Grid container spacing={3}>
						{movies.data.movieSearch.map((movie, index) => (
							<Grid item className={classes.root} key={index}>
								<MediaCard key={index} movie={movie} />
							</Grid>
						))}
					</Grid>
				</div>
			)
		} else if (movies.data.movieTrendingWeekly) {
			return (
				<div>
					<Grid container spacing={3}>
						{movies.data.movieTrendingWeekly.map((movie, index) => (
							<Grid item className={classes.root} key={index}>
								<MediaCard key={index} movie={movie} />
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
					{ownMovies.map((movie, index) => (
						<Grid item className={classes.root} key={index}>
							<MediaCard key={index} movie={movie} />
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
