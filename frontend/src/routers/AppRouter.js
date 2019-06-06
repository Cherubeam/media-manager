import React, { useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import lightTheme from '../themes/lightTheme'

import searchReducer from '../reducers/search'
import mediaReducer from '../reducers/media'
import moviesReducer from '../reducers/movies'
import seriesReducer from '../reducers/series'
import filtersReducer from '../reducers/filters'
import MediaContext from '../context/MediaContext'
import Header from '../components/Layouts/Header'
import SearchPage from '../components/Search/SearchPage'
import MoviesDashboard from '../components/MoviesDashboard'
import SeriesDashboard from '../components/SeriesDashboard'
import moviesDatabase from '../database/moviesDatabase'
import seriesDatabase from '../database/seriesDatabase'

// MUI theme
const theme = lightTheme()

// Initial states
const initialSearchState = {
	loading: true,
	media: [],
	movies: [],
	series: [],
	errorMessage: null
}

const initialMediaState = {
	loading: true,
	media: [],
	errorMessage: null
}

const initialMoviesState = {
	loading: true,
	movies: moviesDatabase(),
	errorMessage: null
}

const initialSeriesState = {
	loading: true,
	series: seriesDatabase(),
	errorMessage: null
}

const initialFiltersState = {
	mediaType: 'movie'
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
		mediaState: useReducer(mediaReducer, initialMediaState),
		moviesState: useReducer(moviesReducer, initialMoviesState),
		seriesState: useReducer(seriesReducer, initialSeriesState),
		filtersState: useReducer(filtersReducer, initialFiltersState)
	})
	const {
		searchState,
		mediaState,
		moviesState,
		seriesState,
		filtersState
	} = state

	return (
		<ThemeProvider theme={theme}>
			<MediaContext.Provider
				value={{
					searchState,
					mediaState,
					moviesState,
					seriesState,
					filtersState,
					dispatch
				}}
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
