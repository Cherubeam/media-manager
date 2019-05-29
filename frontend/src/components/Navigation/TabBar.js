import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	}
}))

const TabBar = () => {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	function handleChange(event, newValue) {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Search" />
					<Tab label="Movies" />
					<Tab label="Series" />
				</Tabs>
			</AppBar>
			{value === 0 && <TabContainer>Search</TabContainer>}
			{value === 1 && <TabContainer>Movies</TabContainer>}
			{value === 2 && <TabContainer>Series</TabContainer>}
		</div>
	)
}

export default TabBar
