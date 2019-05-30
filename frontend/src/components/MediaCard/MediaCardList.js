import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MediaCard from './MediaCard'
import SearchMoviesContext from '../../context/SearchMovies'

const styles = theme => ({
	root: {
		flexGrow: 1
	}
})

const MediaCardList = props => {
	const { classes } = props
	const { movies } = useContext(SearchMoviesContext)

	if (movies.data.movieSearch) {
		return (
			<div className={classes.root}>
				<h1>Result</h1>
				<Grid container spacing={3}>
					{movies.data.movieSearch.map((movie, index) => (
						<Grid item className={classes.root} key={item}>
							<MediaCard key={index} movie={movie} />
						</Grid>
					))}
				</Grid>
			</div>
		)
	} else {
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
}

MediaCardList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaCardList)