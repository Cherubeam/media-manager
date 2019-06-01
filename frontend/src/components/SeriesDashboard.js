import React, { Fragment, useContext, useEffect } from 'react'

import MediaContext from '../context/MediaContext'
import MediaCardList from './MediaCard/MediaCardList'

export default () => {
	const { seriesState, dispatch } = useContext(MediaContext)

	useEffect(() => {
		const series = JSON.parse(localStorage.getItem('series'))

		if (series) {
			dispatch({
				type: 'POPULATE_SERIES',
				series
			})
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('series', JSON.stringify(seriesState.series))
	}, [seriesState])

	const { loading, series, errorMessage } = seriesState

	return (
		<Fragment>
			<h1>My Series</h1>
			<div className="series">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					<MediaCardList ownSeries={series} />
				)}
			</div>
		</Fragment>
	)
}
