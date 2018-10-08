const request = require('request')

const keys = require('../../config/keys')

let movieId = 272
let language = 'de'

console.log(keys.tmdb)

// GET a movie ID | Solution with Promise
const getMovieDetails = new Promise((resolve, reject) => {
    request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,images,keywords&api_key=${keys.tmdb.apiKey}&language=${language}`,
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
                poster: body.poster_path,
                videos: body.videos.results,
                genres: body.genres,
                keywords: body.keywords.keywords
            })
        }
    })
})

// GET the movie credits by ID
const getMovieCredits = new Promise((resolve, reject) => {
    request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${keys.tmdb.apiKey}&language=${language}`,
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
                cast: body.cast,
                crew: body.crew
            })
        }
    })
})

module.exports.getMovieDetails = getMovieDetails
module.exports.getMovieCredits = getMovieCredits

// GET a movie by ID | Solution with callback
// const getMovieDetails = (callback) => {
//     request({
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${keys.tmdb.apiKey}&language=${language}`,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             callback({
//                 errorCode: error.code,
//                 host: error.host,
//                 port: error.port,
//                 message: `Error: ${error.code} | Host: ${error.host} | Port: ${error.port} -> Please check the API-URL.`
//             })
//         } else if (response.statusCode === 401) {
//             callback({
//                 statusCode: response.statusCode,
//                 statusMessage: response.body.status_message
//             })
//         } else if (response.statusCode === 404) {
//             callback({
//                 statusCode: response.statusCode,
//                 statusMessage: response.body.status_message
//             })
//         } else if (response.statusCode === 200) {
//             callback(undefined, {
//                 title: body.title,
//                 releaseDate: body.release_date,
//                 description: body.overview,
//                 rating: body.vote_average,
//                 poster: body.poster_path
//             })
//         }
//     })
// }