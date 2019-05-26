import React, { useState, useContext } from 'react'
import MoviesContext from '../context/moviesContext'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      margin: theme.spacing(1),
    },
  }))

export default (props) => {
    const classes = useStyles()
    const [searchValue, setSearchValue ] = useState('')

    //--- TESTING START
    const { movies } = useContext(MoviesContext)
    console.log('--- MOVIES ---')
    console.log(movies[0])
    //--- TESTING END

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value)
        console.log(e.target.value)
    }

    const resetInputField = () => {
        setSearchValue('')
    }

    const submitSearchInput = e => {
        e.preventDefault()
        props.searchMovie(searchValue)
        resetInputField()
    }

    return (
        <form>
            <Input
                placeholder="Search movie"
                className={classes.input}
                inputProps={{
                    'aria-label': 'Description',
                }}
                value={searchValue}
                onChange={handleSearchInputChanges}
            />
            <input onClick={submitSearchInput} type="submit" value="SEARCH"/>
        </form>
    )
}
