import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	}
}))

const TabBar = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Search" component={Link} to="/" />
					<Tab label="Movies" component={Link} to="/movies" />
					<Tab label="Series" component={Link} to="/series" />
				</Tabs>
			</AppBar>
		</div>
	)
}

export default TabBar
