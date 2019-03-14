import request from 'request'

const language = 'de'

const Query = {
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
                        poster: body.poster_path,
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
                        cast: body.cast//,
                        //crew: body.crew
                    })
                }
            })
        })
    }
}

export { Query as default }