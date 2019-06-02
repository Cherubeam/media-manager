import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(2),
		width: 600
	}
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
		<form classes={classes.container} onSubmit={submitSearchInput}>
			<TextField
				className={classes.textfield}
				type="search"
				label="Search"
				helperText="Search for Movies or Series"
				autoFocus
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					'aria-label': 'Search'
				}}
				value={searchValue}
				onChange={handleSearchInputChanges}
			/>
		</form>
	)
}

SearchBar.propTypes = {
	searchMovie: PropTypes.func.isRequired
}

export default SearchBar
