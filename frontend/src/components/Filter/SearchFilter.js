import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { Movie, Tv } from '@material-ui/icons'

import MediaContext from '../../context/MediaContext'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	}
}))

const SearchFilter = ({ handleClickMoviesFilter }) => {
	const classes = useStyles()
	const { mediaState } = useContext(MediaContext)

	// const handleClick = media => console.log(`Filtered by ${media}`)

	return (
		<div>
			<Chip
				icon={<Movie />}
				label="Movies"
				clickable
				className={classes.chip}
				color="primary"
				onClick={() => handleClickMoviesFilter(mediaState, 'movie')}
			/>
			<Chip
				icon={<Tv />}
				label="Series"
				clickable
				className={classes.chip}
				color="primary"
				onClick={() => handleClickMoviesFilter(mediaState, 'series')}
			/>
		</div>
	)
}

export default SearchFilter
