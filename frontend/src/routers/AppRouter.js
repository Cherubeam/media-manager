import React, { useReducer } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import lightTheme from '../themes/lightTheme'

import movieReducer from '../reducers/movies'
import searchReducer from '../reducers/search'
import MediaContext from '../context/MediaContext'
import Header from '../components/Layouts/Header'
import SearchPage from '../components/Search/SearchPage'
import MoviesDashboard from '../components/MoviesDashboard'
import SeriesDashboard from '../components/SeriesDashboard'
import NotFoundPage from '../components/NotFoundPage'

// MUI theme
const theme = lightTheme()

// Initial search state
const initialState = {
	loading: true,
	movies: [],
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
		search: useReducer(searchReducer, initialState),
		movie: useReducer(movieReducer, [])
	})
	const { search, movie } = state

	return (
		<ThemeProvider theme={theme}>
			<MediaContext.Provider value={{ search, movie, dispatch }}>
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
