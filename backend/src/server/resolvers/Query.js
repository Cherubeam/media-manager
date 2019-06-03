import request from 'request'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
	path: path.join(__dirname, '../../../config/apiKeys.env')
})

const language = 'de'
const region = 'DE'

const Query = {
	multiSearch(parent, { query }, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/search/multi?api_key=${
						process.env.TMDB_API_KEY
					}&query=${query}&include_adult=true&language=${language}&region=${region}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						const payload = []

						body.results.forEach(media => {
							let mediaObject = {
								tmdbID: media.id,
								description: media.overview,
								tmdbVoteAverage: media.vote_average,
								tmdbVoteCount: media.vote_count,
								poster: `https://image.tmdb.org/t/p/w342/${
									media.poster_path
								}`,
								mediaType: media.media_type
							}
							const objectKeys = Object.keys(media)

							if (
								objectKeys.includes('title' && 'original_title')
							) {
								mediaObject.originalTitle = media.original_title
								mediaObject.germanTitle = media.title
							} else if (
								objectKeys.includes('name' && 'original_name')
							) {
								mediaObject.originalName = media.original_name
								mediaObject.germanName = media.name
							}

							if (objectKeys.includes('release_date')) {
								mediaObject.releaseDate = media.release_date
							} else if (objectKeys.includes('first_air_date')) {
								mediaObject.firstAirDate = media.first_air_date
							}

							payload.push(mediaObject)
						})
						resolve(payload)
					}
				}
			)
		})
	},
	movieSearch(parent, { query }, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/search/movie?api_key=${
						process.env.TMDB_API_KEY
					}&query=${query}&language=${language}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						const payload = []
						body.results.forEach(movie => {
							payload.push({
								tmdbID: movie.id,
								originalTitle: movie.original_title,
								germanTitle: movie.title,
								releaseDate: movie.release_date,
								description: movie.overview,
								tmdbVoteAverage: movie.vote_average,
								tmdbVoteCount: movie.vote_count,
								poster: `https://image.tmdb.org/t/p/w342/${
									movie.poster_path
								}`
							})
						})
						resolve(payload)
					}
				}
			)
		})
	},
	movieDetails(parent, { id }, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,images,keywords&api_key=${
						process.env.TMDB_API_KEY
					}&language=${language}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						resolve({
							tmdbID: body.id,
							imdbID: body.imdb_id,
							originalTitle: body.original_title,
							germanTitle: body.title,
							releaseDate: body.release_date,
							description: body.overview,
							runtime: body.runtime,
							tmdbVoteAverage: body.vote_average,
							tmdbVoteCount: body.vote_count,
							poster: `https://image.tmdb.org/t/p/w342/${
								body.poster_path
							}`,
							videos: body.videos.results,
							genres: body.genres,
							keywords: body.keywords.keywords
						})
					}
				}
			)
		})
	},
	movieCredits(parent, { id }, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
						process.env.TMDB_API_KEY
					}&language=${language}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						resolve({
							cast: body.cast
							// TODO: crew: body.crew
						})
					}
				}
			)
		})
	},
	movieTrendingWeekly(parent, args, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${
						process.env.TMDB_API_KEY
					}&language=${language}&region=${region}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						const payload = []
						body.results.forEach(movie => {
							payload.push({
								tmdbID: movie.id,
								originalTitle: movie.original_title,
								germanTitle: movie.title,
								releaseDate: movie.release_date,
								description: movie.overview,
								tmdbVoteAverage: movie.vote_average,
								tmdbVoteCount: movie.vote_count,
								popularity: movie.popularity || null,
								poster: `https://image.tmdb.org/t/p/w342/${
									movie.poster_path
								}`
							})
						})
						resolve(payload)
					}
				}
			)
		})
	},
	seriesTrendingWeekly(parent, args, ctx, info) {
		return new Promise((resolve, reject) => {
			request(
				{
					method: 'GET',
					url: `https://api.themoviedb.org/3/trending/tv/week?api_key=${
						process.env.TMDB_API_KEY
					}&language=${language}&region=${region}`,
					json: true
				},
				(error, response, body) => {
					if (error) {
						reject(
							new Error(
								JSON.stringify(
									{
										errorCode: error.code,
										host: error.host,
										port: error.port,
										message: `Error: ${
											error.code
										} | Host: ${error.host} | Port: ${
											error.port
										} -> Please check the API-URL.`
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 401) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 404) {
						reject(
							new Error(
								JSON.stringify(
									{
										statusCode: response.statusCode,
										statusMessage:
											response.body.status_message
									},
									undefined,
									2
								)
							)
						)
					} else if (response.statusCode === 200) {
						const payload = []
						body.results.forEach(series => {
							payload.push({
								tmdbID: series.id,
								originalName: series.original_name,
								germanName: series.name,
								firstAirDate: series.first_air_date,
								description: series.overview,
								tmdbVoteAverage: series.vote_average,
								tmdbVoteCount: series.vote_count,
								popularity: series.popularity || null,
								poster: `https://image.tmdb.org/t/p/w342/${
									series.poster_path
								}`
							})
						})
						resolve(payload)
					}
				}
			)
		})
	}
}

export default Query
