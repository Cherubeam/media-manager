import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import lightTheme from '../themes/lightTheme'

import Header from '../components/Layouts/Header'
import SearchPage from '../components/Search/SearchPage'
import MoviesDashboard from '../components/MoviesDashboard'
import SeriesDashboard from '../components/SeriesDashboard'
import NotFoundPage from '../components/NotFoundPage'

const theme = lightTheme()

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterSearchPage = React.forwardRef((props, ref) => (
	<SearchPage innerRef={ref} {...props} />
))

const AdapterMoviesDashboard = React.forwardRef((props, ref) => (
	<MoviesDashboard innerRef={ref} {...props} />
))

const AdapterSeriesDashboard = React.forwardRef((props, ref) => (
	<SeriesDashboard innerRef={ref} {...props} />
))

const AppRouter = () => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<div>
				<Header />
				<CssBaseline />
				<Switch>
					<Route exact path="/" component={AdapterSearchPage} />
					<Route path="/movies" component={AdapterMoviesDashboard} />
					<Route path="/series" component={AdapterSeriesDashboard} />
				</Switch>
			</div>
		</BrowserRouter>
	</ThemeProvider>
)

export default AppRouter
