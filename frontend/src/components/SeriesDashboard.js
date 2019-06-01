import React, { useContext, useEffect } from 'react'

import MediaContext from '../context/MediaContext'
import OwnSeriesContext from '../context/OwnSeries'
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

	const handleRemoveSeries = series => {
		// TODO: check if series exists
		dispatch({
			type: 'REMOVE_OWN_SERIES',
			id: series.tmdbID
		})
	}

	const { loading, series, errorMessage } = seriesState

	return (
		<OwnSeriesContext.Provider value={{ handleRemoveSeries }}>
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
		</OwnSeriesContext.Provider>
	)
}
