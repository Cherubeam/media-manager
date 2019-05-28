import request from 'request'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(__dirname, '../../../config/apiKeys.env')
})

const language = 'de'

const Query = {
    movieSearch(parent, { query }, ctx, info) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/movie?api_key=1cdcca0321bcfe6bdeba2672219b8d86&query=${query}&language=de`,
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(new Error(JSON.stringify({
                        errorCode: error.code,
                        host: error.host,
                        port: error.port,
                        message: `Error: ${error.code} | Host: ${error.host} | Port: ${error.port} -> Please check the API-URL.`
                    }, undefined, 2)))
                } else if (response.statusCode === 401) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
                } else if (response.statusCode === 404) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
                } else if (response.statusCode === 200) {
                    const payload = []
                    body.results.forEach((movie) => {
                        payload.push({
                            tmdbID: movie.id,
                            originalTitle: movie.original_title,
                            germanTitle: movie.title,
                            releaseDate: movie.release_date,
                            description: movie.overview,
                            tmdbVoteAverage: movie.vote_average,
                            tmdbVoteCount: movie.vote_count,
                            poster: `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                        })
                    })
                    resolve(payload)
                }
            })
        })
    },
    movieDetails(parent, { id }, ctx, info) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,images,keywords&api_key=${process.env.TMDB_API_KEY}&language=${language}`,
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(new Error(JSON.stringify({
                        errorCode: error.code,
                        host: error.host,
                        port: error.port,
                        message: `Error: ${error.code} | Host: ${error.host} | Port: ${error.port} -> Please check the API-URL.`
                    }, undefined, 2)))
                } else if (response.statusCode === 401) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
                } else if (response.statusCode === 404) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
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
                        poster: `https://image.tmdb.org/t/p/w342/${body.poster_path}`,
                        videos: body.videos.results,
                        genres: body.genres,
                        keywords: body.keywords.keywords
                    })
                }
            })
        })
    },
    movieCredits(parent, { id }, ctx, info) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=${language}`,
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(new Error(JSON.stringify({
                        errorCode: error.code,
                        host: error.host,
                        port: error.port,
                        message: `Error: ${error.code} | Host: ${error.host} | Port: ${error.port} -> Please check the API-URL.`
                    }, undefined, 2)))
                } else if (response.statusCode === 401) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
                } else if (response.statusCode === 404) {
                    reject(new Error(JSON.stringify({
                        statusCode: response.statusCode,
                        statusMessage: response.body.status_message
                    }, undefined, 2)))
                } else if (response.statusCode === 200) {
                    resolve({
                        cast: body.cast //,
                        //crew: body.crew
                    })
                }
            })
        })
    }
}

export default Query