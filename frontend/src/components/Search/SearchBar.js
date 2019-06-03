import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	}
	// margin: {
	// 	margin: theme.spacing(1)
	// }
	// textField: {
	// 	marginLeft: theme.spacing(1),
	// 	marginRight: theme.spacing(1),
	// 	marginBottom: theme.spacing(2),
	// 	width: 600
	// }
}))

const SearchBar = ({ searchMovie }) => {
	const classes = useStyles()
	const [searchValue, setSearchValue] = useState('')

	const handleSearchInputChanges = e => {
		setSearchValue(e.target.value)
	}

	const resetInputField = () => {
		setSearchValue('')
	}

	const submitSearchInput = e => {
		e.preventDefault()
		searchMovie(searchValue)
		resetInputField()
	}

	return (
		<form
			className={(classes.container, classes.margin)}
			onSubmit={submitSearchInput}
		>
			<Grid container spacing={1} alignItems="flex-end">
				<Grid item>
					<Search />
				</Grid>
				<Grid item>
					<TextField
						id="input-with-icon-textfield"
						type="search"
						label="Search"
						helperText="Search for Movies or Series"
						autoFocus
						InputProps={{
							'aria-label': 'Search'
						}}
						value={searchValue}
						onChange={handleSearchInputChanges}
					/>
				</Grid>
			</Grid>
		</form>
	)
}

SearchBar.propTypes = {
	searchMovie: PropTypes.func.isRequired
}

export default SearchBar
