import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../components/Layouts/Header'
import SearchPage from '../components/SearchPage'
import MoviesDashboard from '../components/MoviesDashboard'
import SeriesDashboard from '../components/SeriesDashboard'
import NotFoundPage from '../components/NotFoundPage'

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
	<BrowserRouter>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Search</Link>
					</li>
					<li>
						<Link to="/movies">Movies</Link>
					</li>
					<li>
						<Link to="/series">Series</Link>
					</li>
				</ul>
			</nav>
			<CssBaseline />
			<Switch>
				<Route exact path="/" component={AdapterSearchPage} />
				<Route path="/movies" component={AdapterMoviesDashboard} />
				<Route path="/series" component={AdapterSeriesDashboard} />
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouter
