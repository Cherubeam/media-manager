import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import MediaContext from '../../context/MediaContext'
import TabBar from '../Navigation/TabBar'
import LinearProgress from '../LinearProgress'

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	}
})

export default () => {
	const classes = useStyles()
	const {
		search: { loading, errorMessage }
	} = useContext(MediaContext)

	return (
		<div className={classes.root}>
			{loading && !errorMessage && <LinearProgress />}
			<AppBar position="static">
				<Toolbar>
					<Typography
						className={classes.title}
						variant="h6"
						color="inherit"
					>
						Media Manager
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
				<TabBar />
			</AppBar>
		</div>
	)
}
