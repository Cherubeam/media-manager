import React, { useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import lightTheme from '../themes/lightTheme'

import searchReducer from '../reducers/search'
import moviesReducer from '../reducers/movies'
import seriesReducer from '../reducers/series'
import MediaContext from '../context/MediaContext'
import Header from '../components/Layouts/Header'
import SearchPage from '../components/Search/SearchPage'
import MoviesDashboard from '../components/MoviesDashboard'
import SeriesDashboard from '../components/SeriesDashboard'
import moviesDatabase from '../database/moviesDatabase'

// MUI theme
const theme = lightTheme()

// Initial states
const initialSearchState = {
	loading: true,
	movies: [],
	errorMessage: null
}

const initialMoviesState = {
	loading: true,
	movies: moviesDatabase(),
	errorMessage: null
}

const initialSeriesState = {
	loading: true,
	series: [],
	errorMessage: null
}

const useCombinedReducer = useReducers => {
	// Global state
	const state = Object.keys(useReducers).reduce(
		(acc, key) => ({ ...acc, [key]: useReducers[key][0] }),
		{}
	)

	// Global dispatch function
	const dispatch = action =>
		Object.keys(useReducers)
			.map(key => useReducers[key][1])
			.forEach(fn => fn(action))

	return [state, dispatch]
}

const AppRouter = () => {
	const [state, dispatch] = useCombinedReducer({
		searchState: useReducer(searchReducer, initialSearchState),
		moviesState: useReducer(moviesReducer, initialMoviesState),
		seriesState: useReducer(seriesReducer, initialSeriesState)
	})
	const { searchState, moviesState, seriesState } = state

	return (
		<ThemeProvider theme={theme}>
			<MediaContext.Provider
				value={{ searchState, moviesState, seriesState, dispatch }}
			>
				<BrowserRouter>
					<div>
						<Header />
						<CssBaseline />
						<Switch>
							<Route exact path="/" component={SearchPage} />
							<Route path="/movies" component={MoviesDashboard} />
							<Route path="/series" component={SeriesDashboard} />
						</Switch>
					</div>
				</BrowserRouter>
			</MediaContext.Provider>
		</ThemeProvider>
	)
}

console.log('AppRouter.js loaded!')

export default AppRouter
